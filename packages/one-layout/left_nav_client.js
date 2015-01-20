Template.leftNav.events ({
  'click .current-user': function () {
    currentUser = Meteor.user();
    Router.go(Routes.PROFILE, {slug: currentUser.slug});
  }
});

Template.leftNav.helpers({
  profile: function () {
    var user = Meteor.user();
    return user && user.profile;
  },
  fullName: function () {
    var currentUser = Meteor.user();
    if (!currentUser) return '';

    return currentUser.profile.firstName + " " + currentUser.profile.lastName;
  }
});

Template.leftNav.rendered = function () {
  $('.menu-link').leftNav();
};
