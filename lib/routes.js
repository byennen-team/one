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
  this.route('home', {path: '/'});
  this.route('home', {path: '/home'});

  this.route('dashboard', {
    path: '/dashboard',
    template: 'dashboard',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  this.route('profile', {
    path: '/profile',
    template: 'profile',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  /* Admin */
  this.route('AdminDashboard', {
    path: '/admin',

    // TODO: add roles
    // onBeforeAction: function() {
    //   user = Meteor.user();
    //   if(!Roles.userIsInRole(user, ['admin'])) {
    //     this.redirect('Homepage');
    //     this.stop();
    //   }
    //   return true;
    // }
  });

  this.route('AdminUsers', {
    path: '/admin/users',

    // TODO: add roles
    // onBeforeAction: function() {
    //   user = Meteor.user();
    //   if(!Roles.userIsInRole(user, ['admin'])) {
    //     this.redirect('Homepage');
    //     this.stop();
    //   }
    //   return true;
    // }
  });

  this.route('AdminCompanies', {
    path: '/admin/companies',

    // TODO: add roles
    // onBeforeAction: function() {
    //   user = Meteor.user();
    //   if(!Roles.userIsInRole(user, ['admin'])) {
    //     this.redirect('Homepage');
    //     this.stop();
    //   }
    //   return true;
    // }
  });
});
