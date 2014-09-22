/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'Application',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

Router.map(function () {
  this.route('Home', {path: '/'});
  this.route('Home', {path: '/home'});

  this.route('LoginElliman', {
    path: '/elliman',
    layoutTemplate: 'Login'
  });

  this.route('Dashboard', {
    path: '/dashboard',
    template: 'dashboard',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  this.route('Profile', {
    path: '/profile',
    template: 'profile',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  /* Admin */
  this.route('AdminDashboard', {
    path: '/admin',

    onBeforeAction: function() {
      user = Meteor.user();
      if(!Roles.userIsInRole(user, ['admin'])) {
        this.redirect('Home');
      }
      return true;
    }
  });

  this.route('AdminUsers', {
    path: '/admin/users',

    onBeforeAction: function() {
      user = Meteor.user();
      if(!Roles.userIsInRole(user, ['admin'])) {
        this.redirect('Home');
      }
      return true;
    }
  });

  this.route('AdminCompanies', {
    path: '/admin/companies',

    // onBeforeAction: function() {
    //   user = Meteor.user();
    //   if(!Roles.userIsInRole(user, ['admin'])) {
    //     this.redirect('Home');
    //   }
    //   return true;
    // }
  });

  this.route('AdminCompaniesNew', {
    path: '/admin/companies/new',

    // onBeforeAction: function() {
    //   user = Meteor.user();
    //   if(!Roles.userIsInRole(user, ['admin'])) {
    //     this.redirect('Home');
    //   }
    //   return true;
    // }
  });
});
