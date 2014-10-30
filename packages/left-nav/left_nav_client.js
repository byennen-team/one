Template.leftNav.helpers({
  profile: function(){
    return Meteor.user().profile;
  },
  fullname: function(){
    var currentUser = Meteor.user();
    return currentUser.profile.firstName + " " + currentUser.profile.lastName;
  }
});

Template.leftNav.rendered = function () {
  $('.menu-link').leftNav();
};
