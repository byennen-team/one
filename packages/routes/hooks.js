// Ensure the user is an admin on admin pages.
Router.onBeforeAction(function () {
  var user = Meteor.user();

  if (! Roles.userIsInRole(user, ['admin'])) {
    this.redirect('login');
  }
}, { only: _.values(Routes.Admin) });

// Auto-redirect a signed in user.
Tracker.autorun(function () {
  var currentRoute = Router.current();
  if (Meteor.user() && currentRoute && currentRoute.route.name === Routes.LOGIN) {
    Router.go(Routes.DASHBOARD, {}, {replaceState: true});
  }
});