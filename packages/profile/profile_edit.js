Template.profileEdit.render = function () {
  $('.upload').attr('title', '');
};

Template.profileEdit.events({
  'change .upload': function (event) {
    Profile.uploadPictureFromForm(event.target.files[0], function (error, result) {
      if (error) return; // TODO error message

      var photoUrl = Meteor.settings.public.AWS_BUCKET_URL + '/' + result.filePath;
      Meteor.users.update(Meteor.userId(), {$set: {'profile.photoUrl': photoUrl}});
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
