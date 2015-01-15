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
    $("body").addClass("public-profile");
  },
  'click .private': function () {
    forcePublic.set(false);
    $("body").removeClass("public-profile");
  }
});
