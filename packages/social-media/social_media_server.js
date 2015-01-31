/* globals SocialStatuses: true, ServiceConfiguration: true,
SocialMedia: true, Twitter: true, OAuth: true, Facebook: true,
cachedHttp: true */
var CACHE_INTERVAL_MINUTES = 5 * 60000;

Meteor.publish('socialStatuses', function(userId) {
  check(userId, String);

  var user = Meteor.users.findOne(userId);
  var twitterId = null;
  var facebookId = null;

  if (user) {
    if (user.services && user.services.twitter && user.services.twitter.id)
      twitterId = user.services.twitter.id;

    if (user.services && user.services.facebook && user.services.facebook.id)
      facebookId = user.services.facebook.id;



    if (twitterId && facebookId){
      return SocialStatuses.find({
        $or: [
        { userNetworkId: twitterId },
        { userNetworkId: facebookId }
        ]},{
          limit: 4,
          sort: {
            datePosted: -1
          }
        });
    }

    if (twitterId){
      return SocialStatuses.find({ userNetworkId: twitterId },{
          limit: 4,
          sort: {
            datePosted: -1
          }
        });
    }

    if (facebookId) {
      return SocialStatuses.find({ userNetworkId: facebookId },{
          limit: 4,
          sort: {
            datePosted: -1
          }
        });
    }

  }
});

Meteor.publish('companySocialStatuses', function(twitterId) {
  check(twitterId, String);

  return SocialStatuses.find({ userNetworkId: twitterId });
});

// Load Twitter settings from Settings file
ServiceConfiguration.configurations.upsert(
  { service: 'twitter' },
  { $set:
    { consumerKey: Meteor.settings.twitter.CONSUMER_KEY,
      secret: Meteor.settings.twitter.SECRET }
  });

//internal collection to hold Twitter Tokens
var _socialMediaTokens = new Mongo.Collection("_socialMediaTokens");
//internal collection to cache responses from social networks
var _socialMediaCache = new Mongo.Collection("_socialMediaCache");

SocialMedia.cachedHttp = function(method, url, options, force, cacheTime) {
  check(method, String);
  check(url, String);
  check(options, Object);

  if (force)
    check(force, Boolean);
  else
    force = false;

  if (cacheTime) {
    check(cacheTime, Number);
    cacheTime = cacheTime * 60000;
  }
  else
    cacheTime = CACHE_INTERVAL_MINUTES;
  //check if it's already a cached response
  var stringToCheck = method + url + JSON.stringify(options);

  var cachedResponse = _socialMediaCache.findOne({
    requestString: stringToCheck,
    createdAt: {
      $gt: new Date(new Date().getTime() - cacheTime)
    }
  });

  if (! cachedResponse || force === true) {
  //nothing cached, or call is forced, make a call
    try {
      var response = HTTP.call(method, url, options);
      if (response) {
        //delete any previous responses with the same params
        _socialMediaCache.remove({
          requestString: stringToCheck
        });
        //save the new response
        _socialMediaCache.insert({
          requestString: stringToCheck,
          responseString: JSON.stringify(response.data),
          createdAt: new Date()
        });
        return (null,{ type: 'fresh', data: response.data });
      }
    } catch (e) {
      return(e);
    }
  } else { //we already have a response
    return (null,{ type: 'cached',
      data: JSON.parse(cachedResponse.responseString) });
  }

};

SocialMedia.twitterParser = Npm.require('twitter-text');
SocialMedia.hasTwitter = function() {
  if (! this.userId)
    return false;

  var user = Meteor.users.findOne(this.userId);

  if (! user)
    return false;

  var twitter = user.services.twitter.id;

  if (!twitter)
    return false;

  return true;

  };

SocialMedia.twitter = {};

SocialMedia.twitter.encodeSecrets = function() {
  return new Buffer(encodeURIComponent(Meteor.settings.twitter.CONSUMER_KEY)+
    ':' + encodeURIComponent(Meteor.settings.twitter.SECRET))
      .toString('base64');
};

SocialMedia.twitter.getApplicationBearerToken = function() {
  /*jshint camelcase: false */
  var possibleToken = _socialMediaTokens.findOne({
    type: 'twitter'
  });

  if (possibleToken)
    return (possibleToken.token);

  var base64encodedString = SocialMedia.twitter.encodeSecrets();
  var authOptions = {
    headers: {
      'Authorization': 'Basic ' + base64encodedString,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    content: 'grant_type=client_credentials'
  };

  try {
    var response = HTTP.post('https://api.twitter.com/oauth2/token',
      authOptions);
    if (response.data.token_type === 'bearer') {
      _socialMediaTokens.insert({
        type: 'twitter',
        token: response.data.access_token
      });
      return (null, response.data.access_token);
    }
  } catch (e) {
    return(e);
  }
};

SocialMedia.twitter.invalidateApplicationBearerToken = function(accessToken) {
  /*jshint camelcase: false */
  var base64encodedString = SocialMedia.twitter.encodeSecrets();
  var authOptions = {
    headers: {
      'Authorization': 'Basic ' + base64encodedString,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    params: {
      'access_token': accessToken
    }
  };

  try {
    var response = HTTP.post('https://api.twitter.com/oauth2/invalidate_token',
      authOptions);
    if (response.statusCode === 200) {
      _socialMediaTokens.remove({
        type: 'twitter'
      });
      return (null, response.data.access_token);
    }
  } catch (e) {
    return(e);
  }
};

SocialMedia.twitter.getSignature = function(params, user) {
  var unsignedString = '';

  var paramsArray = _.pairs(params);
  _.each(paramsArray, function(item, index) {
    unsignedString = unsignedString + encodeURIComponent(item[0]) +
      '=' + encodeURIComponent(item[1]);
    if(index + 1 !== paramsArray.length)
      unsignedString = unsignedString + "&";
  });

  unsignedString = 'POST&' +
    encodeURIComponent('https://api.twitter.com/1.1/statuses/'+
      'update.json') +
      '&' + encodeURIComponent(unsignedString);

  var signingKey = encodeURIComponent(Meteor.settings.twitter.SECRET) + '&' +
    encodeURIComponent(user.services.twitter.accessTokenSecret);

  var crypto = Npm.require("crypto-js");

  var signature = crypto.HmacSHA1(unsignedString, signingKey);

  var sig = crypto.enc.Base64.stringify(signature);

  return sig;

};
var autopublishedFields = _.map(
    // don't send access token. https://dev.twitter.com/discussions/5025
    Twitter.whitelistedFields.concat(['id', 'screenName']),
    function (subfield) { return 'services.twitter.' + subfield; });

  Accounts.addAutopublishFields({
    forLoggedInUser: autopublishedFields,
    forOtherUsers: autopublishedFields
  });

Meteor.methods({
  saveCredentials: function(token, type) {
    check(token, String);
    check(type, String);

    var credentialSecret = OAuth._pendingCredentials.findOne({
      key: token
    });

    if (! credentialSecret)
      throw new Meteor.Error(500, 'Credentials not set');

    var credentials = (type === 'twitter') ?
      Twitter.retrieveCredential(token,credentialSecret.credentialSecret) :
      Facebook.retrieveCredential(token,credentialSecret.credentialSecret);

    if (!credentials)
      throw new Meteor.Error(500, 'Unknown twitter login Error');

    var options = {};

    if (type === 'twitter')
      options = { 'services.twitter' : credentials.serviceData };
    else
      options = { 'services.facebook' : credentials.serviceData };


    Meteor.users.update( this.userId , {
      $set: options
    });

    return(null, true);
  },
  logoutFromTwitter: function() {
  if (! this.userId )
    throw new Meteor.Error("You are not logged in");

    Meteor.users.update( this.userId, {
      $unset: {
        'services.twitter': null
      }
    });
  },
  logoutFromFacebook: function() {
  if (! this.userId )
    throw new Meteor.Error("You are not logged in");

    Meteor.users.update( this.userId, {
      $unset: {
        'services.facebook': null
      }
    });
  },
  getLatestTweets: function(userId, force) {
    /*jshint camelcase: false */
    check(userId, String);

    if(force)
      check(force,Boolean);
    else
      force = false;

    var user = Meteor.users.findOne(userId);

    if (! user)
      throw new Meteor.Error("You are not logged in");

    if (! user.services ||
        ! user.services.twitter ||
        ! user.services.twitter.id)
      throw new Meteor.Error("User doesn't have a twitter account connected");


    var token = SocialMedia.twitter.getApplicationBearerToken();
      var options = {
        params: {
          user_id: user.services.twitter.id,
          count: 4
        },
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      };
      //get latest tweet stored
      var latestTweet = SocialStatuses.findOne({
        network: 'twitter',
        userNetworkId: user.services.twitter.id
      },{
        sort: {
          datePosted: -1
        },
        limit: 1
      });

      if(latestTweet)
        options.params.since_id = latestTweet.postId;

      try {
        var tweets = SocialMedia.cachedHttp('GET',
          'https://api.twitter.com/1.1/statuses'+
          '/user_timeline.json', options, force);

        _.each(tweets.data, function(item) {
          if (item.retweeted_status)
            item.retweet_status.text =
              SocialMedia.twitterParser.autoLink(item.retweeted_status.text);

          SocialStatuses.insert({
            userNetworkId: user.services.twitter.id,
            text: SocialMedia.twitterParser.autoLink(item.text),
            media: item.entities.media,
            datePosted: new Date(item.created_at),
            network: 'twitter',
            postId: item.id_str,
            payload: item
          });
        });

        return(null, tweets);

      } catch (e) {
        if (e.statusCode === 401) //token invalid, should delete
          _socialMediaTokens.remove({
            type: 'twitter'
          });
        return(e);
      }

  },
  getLatestCompanyTweets: function(twitterId, force) {
    /*jshint camelcase: false */
    check(twitterId, String);
    check(force, Match.Optional(Boolean));

    var token = SocialMedia.twitter.getApplicationBearerToken();
      var options = {
        params: {
          user_id: twitterId,
          count: 10
        },
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      };
      //get latest tweet stored
      var latestTweet = SocialStatuses.findOne({
        network: 'twitter',
        userNetworkId: twitterId
      },{
        sort: {
          datePosted: -1
        },
        limit: 1
      });

      if(latestTweet)
        options.params.since_id = latestTweet.postId;

      try {
        var tweets = SocialMedia.cachedHttp('GET','https://api.twitter.com/1.1/statuses'+
          '/user_timeline.json', options, force);

        _.each(tweets.data, function(item) {
          if (item.retweeted_status)
            item.retweet_status.text =
              SocialMedia.twitterParser.autoLink(item.retweeted_status.text);

          SocialStatuses.insert({
            userNetworkId: twitterId,
            text: SocialMedia.twitterParser.autoLink(item.text),
            media: item.entities.media,
            datePosted: new Date(item.created_at),
            network: 'twitter',
            postId: item.id_str,
            payload: item
          }, function(e,r) {
            if(e)
              throw new Meteor.Error(e.statusCode);

            return(null, tweets);
          });
        });
      } catch (e) {
        if (e.statusCode === 401) //token invalid, should delete
          _socialMediaTokens.remove({
            type: 'twitter'
          });
        return(e);
      }

  },
  postTweet: function(tweet) {
    /*jshint camelcase: false */
    check(tweet, String);

    //checking if the tweet is in accordance to the twitter 140 char limit
    if(SocialMedia.twitterParser.getTweetLength(tweet) > 140)
      throw new Meteor.Error("Tweet is too long");

    var user = Meteor.users.findOne(this.userId);

    if (! user)
      throw new Meteor.Error("You are not logged in");

    if (! user.services ||
        ! user.services.twitter ||
        ! user.services.twitter.id)
      throw new Meteor.Error("User doesn't have a twitter account connected");

    if(! user.services.twitter.accessToken ||
       ! user.services.twitter.accessTokenSecret) {
      Meteor.users.update(user._id, {
        $unset: {
          'services.twitter': null
        }
      });
      //notify
      Notify.addNotification(user._id,{
        message: Notify.generateMessageText(
          Notify.messages.TWITTER_AUTHORIZATION_ERROR.message,
          [user.services.twitter.screenName]
        ),
        title: Notify.messages.TWITTER_AUTHORIZATION_ERROR.title,
        link: '/account-settings'
      });

      throw new Meteor.Error("User credentials are not ok");
    }

    var oauthParams = {
      oauth_consumer_key: Meteor.settings.twitter.CONSUMER_KEY,
      oauth_nonce: Random.secret().replace(/\W/g, ''),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: (new Date().valueOf()/1000).toFixed().toString(),
      oauth_token: user.services.twitter.accessToken,
      oauth_version: '1.0',
      status: tweet
    };

    var signature = SocialMedia.twitter.getSignature(oauthParams, user);

    //getting headers

    try {
      var options = {
        params: {
          status: tweet
        },
        headers: {
          'Authorization': 'OAuth ' +
          'oauth_consumer_key="'+
            encodeURIComponent(oauthParams.oauth_consumer_key) +'", ' +
          'oauth_nonce="'+
            encodeURIComponent(oauthParams.oauth_nonce) +'", ' +
          'oauth_signature="'+
            encodeURIComponent(signature) +'", ' +
          'oauth_signature_method="' +
            encodeURIComponent(oauthParams.oauth_signature_method) +'", ' +
          'oauth_timestamp="' +
            encodeURIComponent(oauthParams.oauth_timestamp) +'", ' +
          'oauth_token="' +
            encodeURIComponent(oauthParams.oauth_token) +'", ' +
          'oauth_version="' +
            encodeURIComponent(oauthParams.oauth_version) +'"',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      HTTP.post('https://api.twitter.com/1.1/statuses/'+
        'update.json', options);

      Meteor.call('getLatestTweets', user._id, true);

      return (null, true);

    } catch (e) {
      if(e.statusCode === 401 || e.statusCode === 403) //removing credentials
        Meteor.users.update(user._id, {
          $unset: {
            'services.twitter': null
          }
        });
      //notify
      Notify.addNotification(user._id,{
        message: Notify.generateMessageText(
          Notify.messages.TWITTER_AUTHORIZATION_ERROR.message,
          [user.services.twitter.screenName]
        ),
        title: Notify.messages.TWITTER_AUTHORIZATION_ERROR.title,
        link: '/account-settings'
      });
      return(e);
    }
  }

});