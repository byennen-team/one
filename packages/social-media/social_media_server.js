var CACHE_INTERVAL_MINUTES = 1 * 60000;

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
          limit: 4
        });
    }

    if (twitterId){
      return SocialStatuses.find({ userNetworkId: twitterId },{
          limit: 4
        });
    }

    if (facebookId) {
      return SocialStatuses.find({ userNetworkId: facebookId },{
          limit: 4
        });
    }

  }
});

// Load Twitter settings from Settings file
ServiceConfiguration.configurations.upsert(
  { service: 'twitter' },
  { $set:
    { consumerKey: Meteor.settings.twitter.CONSUMER_KEY, secret: Meteor.settings.twitter.SECRET }
  });

//internal collection to hold Twitter Tokens
_socialMediaTokens = new Mongo.Collection("_socialMediaTokens");
//internal collection to cache responses from social networks
_socialMediaCache = new Mongo.Collection("_socialMediaCache");

var cachedHttp = function(method, url, options, force) {
  check(method, String);
  check(url, String);
  check(options, Object);

  if (force)
    check(force, Boolean);
  else
    force = false;
  //check if it's already a cached response
  var stringToCheck = method + url + JSON.stringify(options);

  var cachedResponse = _socialMediaCache.findOne({
    requestString: stringToCheck,
    createdAt: {
      $gt: new Date(new Date().getTime() - CACHE_INTERVAL_MINUTES)
    }
  });

  if (! cachedResponse || force === true) {//nothing cached, or call is forced, make a call
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
    return (null,{ type: 'cached', data: JSON.parse(cachedResponse.responseString) });
  }

};

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
  return new Buffer(encodeURIComponent(Meteor.settings.twitter.CONSUMER_KEY)+':'+
    encodeURIComponent(Meteor.settings.twitter.SECRET)).toString('base64');
}

SocialMedia.twitter.getApplicationBearerToken = function() {

  var possibleToken = _socialMediaTokens.findOne({
    type: 'twitter'
  });

  if (possibleToken)
    return (possibleToken.token);

  base64encodedString = SocialMedia.twitter.encodeSecrets();
  var authOptions = {
    headers: {
      'Authorization': 'Basic ' + base64encodedString,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    content: 'grant_type=client_credentials'
  };

  try {
    var response = HTTP.post('https://api.twitter.com/oauth2/token', authOptions);
    if (response.data.token_type === 'bearer') {
      _socialMediaTokens.insert({
        type: 'twitter',
        token: response.data.access_token
      });
      return (null, response.data.access_token);
    }
  } catch (e) {
    return(e)
  }
};

SocialMedia.twitter.invalidateApplicationBearerToken = function() {
  base64encodedString = SocialMedia.twitter.encodeSecrets();
  var authOptions = {
    headers: {
      'Authorization': 'Basic ' + base64encodedString,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    params: {
      'access_token': access_token
    }
  };

  try {
    var response = HTTP.post('https://api.twitter.com/oauth2/invalidate_token', authOptions);
    if (response.statusCode === 200) {
      _socialMediaTokens.remove({
        type: 'twitter'
      })
      return (null, response.data.access_token);
    }
  } catch (e) {
    return(e)
  }
};

SocialMedia.twitter.getSignature = function(params) {

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

    var credentialSecret = Oauth._pendingCredentials.findOne({
      key: token
    });

    if (! credentialSecret)
      throw new Meteor.Error(500, 'Credentials not set');

    var credentials = (type === 'twitter') ?
      Twitter.retrieveCredential(token,credentialSecret.credentialSecret) :
      Facebook.retrieveCredential(token,credentialSecret.credentialSecret);

    if (!credentials)
      throw new Meteor.Error(500, 'Unknown twitter login Error');

    if (type === 'twitter')
      var options = { 'services.twitter' : credentials.serviceData };
    else
      var options = { 'services.facebook' : credentials.serviceData };


    Meteor.users.update( this.userId , {
      $set: options
    })

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
    check(userId, String);

    if(force)
      check(force,Boolean);
    else
      force = false;

    var user = Meteor.users.findOne(userId);

    if (! user)
      throw new Meteor.Error("You are not logged in");

    if (! user.services || ! user.services.twitter || ! user.services.twitter.id)
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

      try {
        var tweets = cachedHttp('GET','https://api.twitter.com/1.1/statuses/user_timeline.json', options, force);
        SocialStatuses.remove({
          userNetworkId: user.services.twitter.id
        });
        _.each(tweets.data, function(item) {
          SocialStatuses.insert({
            userNetworkId: user.services.twitter.id,
            text: item.text,
            datePosted: new Date(item.createdAt),
            network: 'twitter',
            postId: item.id_str
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
  postTweet: function(tweet) {
    check(tweet, String);

    var user = Meteor.users.findOne(userId);

    if (! user)
      throw new Meteor.Error("You are not logged in");

    if (! user.services || ! user.services.twitter || ! user.services.twitter.id)
      throw new Meteor.Error("User doesn't have a twitter account connected");

    var oauthParams = {
      oauth_consumer_key: Meteor.settings.twitter.CONSUMER_KEY,
      oauth_nonce: Random.secret().replace(/\W/g, ''),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: (new Date().valueOf()/1000).toFixed().toString(),
      oauth_token: user.services.twitter.acces_token,
      oauth_version: '1.0'
    }

    var signedParams = SocialMedia.twitter.getSignature(oauthParams);

    var token = SocialMedia.twitter.getApplicationBearerToken();
    try {
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
      var tweets = HTTP.get('https://api.twitter.com/1.1/statuses/user_timeline.json', options);

      console.log(tweets.data);
    } catch (e) {
      console.log(e);
    }
  }

})