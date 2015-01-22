// Load Twitter settings from Settings file
ServiceConfiguration.configurations.upsert(
  { service: 'twitter' },
  { $set:
    { consumerKey: Meteor.settings.twitter.CONSUMER_KEY, secret: Meteor.settings.twitter.SECRET }
  });

Meteor.publish('socialStatuses', function(userId) {
  check(userId, String);

  var user = Meteor.users.findOne(userId);

  if (user) {
    var twitterId = user.services.twitter.id;
    var facebookId = user.services.facebook.id;

    if (twitterId && facebookId)
      return SocialStatuses.find({
        $or: [
        { userNetworkId: twitterId },
        { userNetworkId: facebookId }
        ]},{
          limit: 4
        });

    if (twitterId)
      return SocialStatuses.find({ userNetworkId: twitterId },{
          limit: 4
        });

    if (facebookId)
      return SocialStatuses.find({ userNetworkId: facebookId },{
          limit: 4
        });
  }
});


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
  getLatestTweets: function(userId) {
    check(userId, String);

    var user = Meteor.users.findOne(userId);

    if (! user)
      throw new Meteor.Error("You are not logged in");

    if (! user.services || ! user.services.twitter || ! user.services.twitter.id)
      throw new Meteor.Error("User doesn't have a twitter account connected");

    var TwitMaker = Npm.require('twit');
      //if the loggedin user has twitter connected we'll use his account to show
      //the tweets. Otherwise we'll use the owning user account

    var accessToken, accessTokenSecret;
    var loggedInUser = Meteor.users.findOne(this.userId);
    if(loggedInUser && loggedInUser.services && loggedInUser.services.twitter &&
      loggedInUser.services.twitter.id) {
      accessToken = loggedInUser.services.twitter.accessToken;
      accessTokenSecret = loggedInUser.services.twitter.accessTokenSecret;
    } else {
      accessToken = user.services.twitter.accessToken;
      accessTokenSecret = user.services.twitter.accessTokenSecret;
    }


    var T = new TwitMaker({
        consumer_key: Meteor.settings.twitter.CONSUMER_KEY,
        consumer_secret: Meteor.settings.twitter.SECRET,
        access_token: accessToken,
        access_token_secret: accessTokenSecret
      });

      return Async.runSync(function(done) {
        T.get('statuses/user_timeline', { user_id: user.services.twitter.id, count: 4 },
          function(err, data, response) {
            if (err)
              done(err);

            done (null, data);
          });
      });
  },
  postTweet: function(tweet) {

  }

})