var forcePublic = new ReactiveVar();

Template.profile.helpers({
  isPrivate: function () {
    return Meteor.userId() && !forcePublic.get();
  },
  isMyProfile: Profile.isMyProfile
});

Template.profile.events({
  'click .public': function () {
    forcePublic.set(true);
  },
  'click .private': function () {
    forcePublic.set(false);
  }
});
