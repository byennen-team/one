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
});
