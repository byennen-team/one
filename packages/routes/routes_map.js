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
    path: '/',
    layoutTemplate: 'loginLayout'
  });

  this.route(Routes.LOGOUT, {
    action: function () {
      Meteor.logout();
      this.redirect(Routes.LOGIN);
    }
  });

  this.route(Routes.APPS);

  this.route(Routes.MY_DOCUMENTS, {
    path: '/documents',
    template: 'documents'
  });

  this.route(Routes.COMPANY_DOCUMENTS, {
    path: '/documents/company',
    template: 'documents'
  });

  this.route(Routes.MESSAGES);

  this.route(Routes.DASHBOARD);

  this.route(Routes.DIRECTORY, {
    path: '/directory/:letter?',
    onBeforeAction: function () {
      Search.limit.set(100);
      this.next();
    }
  });

  this.route(Routes.ACCOUNT_SETTINGS, {
    path: '/account-settings',
    data: function () {
      if (Meteor.user()) {
        return Meteor.user().profile;
      }
    }
  });

  this.route(Routes.SUPPORT);

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
