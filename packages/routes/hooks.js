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

Router.onBeforeAction(function () {
  Meteor.subscribe('files');
  this.next();
}, {only: [Routes.DASHBOARD, Routes.COMPANY_DOCUMENTS, Routes.MY_DOCUMENTS]});

Router.onBeforeAction(function () {
  Search.limit.set(6);
  this.next();
}, {except: [Routes.DIRECTORY]});

// set HTML class for current page
Router.onBeforeAction(function () {
  $('body').removeClass().addClass(Routes.getName());
  this.next();
});

// Auto-redirect a signed in user.
Tracker.autorun(function () {
  if (Meteor.user() && Routes.getName() === Routes.LOGIN) {
    Router.go(Routes.DASHBOARD, {}, {replaceState: true});
  }
});