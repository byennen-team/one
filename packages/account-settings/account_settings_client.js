Profile = {};

Template.accountSettings.events({
  'change .upload': function (event) {
FileTools.upload('signProfilePictureUpload', event.target.files[0], {
      onError: function (error) {
        // TODO error message
        alert(error);
      },
      onComplete: function (result) {
        var photoUrl = Meteor.settings.public.AWS_BUCKET_URL + '/' + result.filePath;
        Meteor.call('resizeNewProfileImage', photoUrl);
        //Meteor.users.update(Meteor.userId(), {$set: {'profile.photoUrl': photoUrl, 'profile.photoKey': result.filePath}});
      }
    });
  },
  'click #delete-profile-picture': function(event) {
    var key = $(event.target).data("url");

    if (key && key.length > 0)
      FileTools.deleteStub('deleteFilesFromS3',key,function(err,result) {
          if (err) {
            alert(err);
          } else {
            Meteor.users.update(Meteor.userId(),{$unset: {'profile.photoUrl': "", 'profile.photoKey': ""}});
          }
        });
  },
  'submit form': function (event, template) {
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

