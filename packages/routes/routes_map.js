/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'application',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: Routes.LOGIN,
});

Router.route('/logout', {
  name: Routes.LOGOUT,
  action: function () {
    Meteor.logout();
    this.redirect(Routes.LOGIN);
  }
});

Router.route('/apps', {
  name: Routes.APPS
});

Router.route('/documents', {
  name: Routes.MY_DOCUMENTS,
  template: 'documents',
  waitOn: function () {
    return Meteor.subscribe('files');
  },
  action: function () {
    resetDocumentSelection();
    Session.set('currentFolderId', null);
    this.render();
  }
});

Router.route('/documents/company', {
  name: Routes.COMPANY_DOCUMENTS,
  template: 'documents',
  waitOn: function () {
    return Meteor.subscribe('files');
  },
  action: function () {
    resetDocumentSelection();
    Session.set('currentFolderId', null);
    this.render();
  }
});

Router.route('/documents/shared/:sharedDocumentId/:accessToken', {
  name: Routes.SHARED_DOCUMENT,
  template: 'documents',
  waitOn: function () {
    return Meteor.subscribe(
      'sharedDocument',
      this.params.sharedDocumentId,
      this.params.accessToken
    );
  },
  action: function () {
    resetDocumentSelection();
    Session.set('currentFolderId', null);
    this.render();
  }
});

Router.route('/folders/:_id', {
  name: Routes.FOLDER,
  template: 'documents',
  waitOn: function () {
    return Meteor.subscribe('files');
  },
  action: function () {
    resetDocumentSelection();
    Session.set('currentFolderId', this.params._id);
    this.render();
  }
});

Router.route('/messages', {
  name: Routes.MESSAGES
});

Router.route('/dashboard', {
  name: Routes.DASHBOARD,
  waitOn: function() {
    return [Meteor.subscribe('companySocialStatuses',
      Meteor.settings.public.twitter.COMPANY_USERID),
      Meteor.subscribe('files'),
      Meteor.subscribe('rooms'),
      Meteor.subscribe('unreadMessages')];
  }
});

Router.route('/directory/:letter?', {
  name: Routes.DIRECTORY,
  onBeforeAction: function () {
    Search.limit.set(100);
    this.next();
  }
});

Router.route('/account-settings', {
  name: Routes.ACCOUNT_SETTINGS,
  data: function () {
    if (Meteor.user()) {
      return Meteor.user().profile;
    }
  }
});

Router.route('/support', {
  name: Routes.SUPPORT
});

Router.route('/style-guide', {
  name: Routes.STYLE_GUIDE
});

/* Admin */
Router.route('/admin', {
  name: Routes.Admin.DASHBOARD
});

Router.route('/admin/users', {
  name: Routes.Admin.USERS
});

Router.route('/admin/companies', {
  name: Routes.Admin.COMPANIES
});

Router.route('/admin/companies/new', {
  name: Routes.Admin.COMPANIES_NEW
});

// Put this at the end so it does not clobber the other routes.
Router.route('/:slug', {
  name: Routes.PROFILE,
  data: function () {
    var user = Meteor.users.findOne({slug: this.params.slug});

    if (user && Meteor.user()) {
      Meteor.subscribe('followers', user._id);
      Meteor.subscribe('following', user._id);
      Meteor.subscribe('galleries', user._id);
      Meteor.subscribe('socialStatuses', user._id);
    }

    return user;
  },
  waitOn: function () {
    return Meteor.subscribe('userProfile', this.params.slug);
  },
  action: function () {
    if (!this.data()) this.render('notFound');
    else this.render('profile');
  }
});

Router.route('/files', {where: 'server'})
  .get(Routes.Server.getFiles || function () {});

if (Meteor.isClient) {
  Tracker.autorun(function () {
    if (!Meteor.userId()) return;

    Meteor.subscribe('following');
  });
}

function resetDocumentSelection() {
  Session.set('selectedDocuments', []);
}
