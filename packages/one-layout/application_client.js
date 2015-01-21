Template.application.events({
  'click .logout': function (event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});

Template.application.helpers({
  isPublic: function () {
    if (
      Profile.forcePublic.get() !== undefined &&
      Profile.forcePublic.get() === true
    )
      return false;
    else
      return true;
  }
});
