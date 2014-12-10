var forcePublic = new ReactiveVar();

Template.profile.helpers({
  isPrivate: function () {
    return Meteor.userId() && !forcePublic.get();
  },

  isMyProfile: Profile.isMyProfile
});
