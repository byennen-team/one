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

  this.route(Routes.COMPANY_DOCUMENTS, {
    path: '/company-documents'
  });

  this.route(Routes.MY_DOCUMENTS, {
    path: '/my-documents'
  });

  this.route(Routes.MESSAGES);

  this.route(Routes.DASHBOARD);

  this.route(Routes.DIRECTORY);

  this.route(Routes.PROFILE_EDIT, {
    path: '/profile/edit',
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

if (Meteor.isClient) {
  Tracker.autorun(function () {
    return Meteor.subscribe('searchResults', Search.text());
  });
}
