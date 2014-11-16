Template.application.events({
  'click .logout': function (event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});

Template.application.helpers({
  profileUrl: function () {
    return getProfileUrl(Meteor.user());
  }
});
