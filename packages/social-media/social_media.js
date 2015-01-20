// Write your package code here!
Template.loginWithSocialMedia.events({
  'click #loginWithTwitter': function(e) {
    e.preventDefault();

    Twitter.requestCredential(function(r) {
      //this is returning an access Token that needs to be saved

    });
  }
})