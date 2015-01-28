/* global Profile: true */

Profile = {};

Template.accountSettings.events({
  'change .upload': function (event) {
    FileTools.s3Upload(event.target.files[0], 'profile-images', {
      onError: function (error) {
        // TODO error message
        alert(error);
      },
      onComplete: function (result) {
        console.log('oncomplete', result);

        //Meteor.call('resizeNewProfileImage', photoUrl);

        Meteor.users.update(Meteor.userId(), {
          $set: {
            'profile.photoUrl.large': result.fullUrl,
            'profile.photoUrl.thumb': result.thumbUrl
          }
        });
      }
    });
  },
  'click #delete-profile-picture': function(event) {
    var key = $(event.target).data("url");

    if (key && key.length > 0)
      FileTools.deleteStub('deleteFilesFromS3',key,function(err) {
          if (err) {
            alert(err);
          } else {
            Meteor.users.update(
              Meteor.userId(),
              {$unset: {'profile.photoUrl': "", 'profile.photoKey': ""}}
            );
          }
        });
  },
  'submit form': function (event) {
    event.preventDefault();
    var data = SimpleForm.processForm(event.target);
    var combinedData = _.extend(Meteor.user().profile, data);
    Meteor.users.update(Meteor.userId(), {$set: {profile: combinedData}});
    Router.go('dashboard');
  }
});
Template.accountSettings.helpers({
    profile: function () {
    var user = Meteor.user();
    return user && user.profile;
}});

