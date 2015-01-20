SocialMedia = {
  twitter: {},
  facebook: {}
};

// Write your package code here!
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
  }
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