// TODO: make this helper global
Template.navbar.helpers({
  activeForRoute: function (routeName) {
    return Routes.getName() === routeName ? 'active' : '';
  }
});
