// Ensure the user is an admin on admin pages.
Router.onBeforeAction(function () {
  var user = Meteor.user();

  if (!Roles.userIsInRole(user, ['admin'])) {
    this.redirect('login');
  } else {
    this.next();
  }
}, {only: _.values(Routes.Admin)});

// Ensure the user is logged in.
Router.onBeforeAction(function () {
  if (Meteor.loggingIn()) {
    return;
  }

  var user = Meteor.user();
  if (!user) {
    Router.go(Routes.LOGIN);
  } else {
    this.next();
  }
}, {except: [Routes.LOGIN, Routes.LOGOUT]});

// Auto-redirect a signed in user.
Tracker.autorun(function () {
  var currentRoute = Router.current();
  if (Meteor.user() && currentRoute && currentRoute.route.getName() === Routes.LOGIN) {
    Router.go(Routes.DASHBOARD, {}, {replaceState: true});
  }
});