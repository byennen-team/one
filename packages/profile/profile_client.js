var getSlug = function () {
  return Router.current().params.slug;
};

Template.profile.helpers({
  isPublic: function () {
    return !Meteor.userId();
  },
  isMyProfile: function () {
    var user = Meteor.user();
    return user && user.slug === getSlug();
  }
});