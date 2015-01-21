SocialMedia = {
  twitter: {},
  facebook: {}
};

Template.loginWithSocialMedia.helpers({
  loggedInWithTwitter: function() {
    var user = Meteor.user();
    return (user && user.services && user.services.twitter &&
      user.services.twitter.screenName) ? true : false;
  },
  loggedInWithFacebook: function() {
    var user = Meteor.user();
    return (user && user.services && user.services.facebook &&
      user.services.facebook.screenName) ? true : false;
  },
  twitterName: function() {
    var user = Meteor.user();
    if (user && user.services && user.services.twitter)
      return user.services.twitter.screenName;
  },
  facebookName: function() {
    var user = Meteor.user();
    if (user && user.services && user.services.facebook)
      return user.services.facebook.screenName;
  }
});
Template.loginWithSocialMedia.events({
  'click #loginWithTwitter': function(e) {
    e.preventDefault();

    var credentialRequestCompleteCallback = SocialMedia.twitter.credentialRequestCompleteHandler(function(tokenOrError) {
      if(tokenOrError && tokenOrError instanceof Error) {
        console.log(tokenOrError);
      } else {
        //autentification complete do something here.
        console.log('Done')
      };
    });

    Twitter.requestCredential(credentialRequestCompleteCallback);
  },
  'click #logoutFromTwitter': function(e) {
    e.preventDefault();

    Meteor.call('logoutFromTwitter', function(error, result) {
      if (error)
        console.log(error);
    });
  },
  'click #loginWithFacebook': function(e) {
    e.preventDefault();

    var credentialRequestCompleteCallback = SocialMedia.facebook.credentialRequestCompleteHandler(function(tokenOrError) {
      if(tokenOrError && tokenOrError instanceof Error) {
        console.log(tokenOrError);
      } else {
        //autentification complete do something here.
        console.log('Done')
      };
    });

    Facebook.requestCredential(credentialRequestCompleteCallback);
  },
  'click #logoutFromFacebook': function(e) {
    e.preventDefault();

    Meteor.call('logoutFromFacebook', function(error, result) {
      if (error)
        console.log(error);
    });
  },
})

SocialMedia.twitter.credentialRequestCompleteHandler = function(callback) {
  return function (credentialTokenOrError) {
    if(credentialTokenOrError && credentialTokenOrError instanceof Error) {
      callback && callback(credentialTokenOrError);
    } else {
      Meteor.call('saveCredentials', credentialTokenOrError, 'twitter');
      callback && callback(credentialTokenOrError);
    }
  };
};

SocialMedia.facebook.credentialRequestCompleteHandler = function(callback) {
  return function (credentialTokenOrError) {
    if(credentialTokenOrError && credentialTokenOrError instanceof Error) {
      callback && callback(credentialTokenOrError);
    } else {
      Meteor.call('saveCredentials', credentialTokenOrError, 'facebook');
      callback && callback(credentialTokenOrError);
    }
  };
};