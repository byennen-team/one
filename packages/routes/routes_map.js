/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'application',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.map(function () {
  this.route(Routes.LOGIN, {
    path: '/'
  });

  this.route(Routes.LOGIN, {
    path: '/home'
  });

  this.route(Routes.LOGOUT, {
    path: '/logout',
    action: function () {
      Meteor.logout();
      this.redirect(Routes.LOGIN);
    }
  });


  this.route(Routes.DASHBOARD, {
    path: '/dashboard',
    onBeforeAction: function () {
      // TODO: Sign In Required/
    }
  });

  this.route(Routes.PROFILE, {
    path: '/profile',
    onBeforeAction: function () {
      // TODO: Sign In Required/
    }
  });

  /* Admin */
  this.route(Routes.Admin.DASHBOARD, {
    path: '/admin'
  });

  this.route(Routes.Admin.USERS, {
    path: '/admin/users'
  });

  this.route(Routes.Admin.COMPANIES, {
    path: '/admin/companies'
  });

  this.route(Routes.Admin.COMPANIES_NEW, {
    path: '/admin/companies/new'
  });
});
