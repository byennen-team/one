// Ensure the user is an admin on admin pages.
Router.onBeforeAction(function () {
  var user = Meteor.user();

  if(!Roles.userIsInRole(user, ['admin'])) {
    this.redirect('login');
  }
}, { only: _.values(Routes.Admin) });