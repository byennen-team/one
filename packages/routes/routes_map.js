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

  // Style Guide
  this.route(Routes.STYLE_GUIDE, {
    path: '/style-guide'
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

  // Put this at the end so it does not clobber the other routes.
  this.route(Routes.PROFILE, {
    path: '/:slug',
    data: function () {
      var user = Meteor.users.findOne({slug: this.params.slug});

      if (user && Meteor.user()) {
        Meteor.subscribe('followers', user._id);
        Meteor.subscribe('following', user._id);
      }

      return user;
    },
    waitOn: function () {
      return Meteor.subscribe('userProfile', this.params.slug);
    },
    action: function () {
      if (!this.data()) this.render('notFound');
      else this.render('profile')
    }
  });

});

if (Meteor.isClient) {
  Tracker.autorun(function () {
    if (!Meteor.userId()) return;

    Meteor.subscribe('following');
  });
}
