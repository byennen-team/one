Template.application.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
  }
});

Template.application.helpers({
  profileUrl: function () {
    return getProfileUrl(Meteor.user());
  }
});

Template.header.helpers({
  activeIfTemplateIs: function (template) {
    var currentRoute = Router.current();
    return currentRoute &&
      template === currentRoute.lookupTemplate() ? 'active' : '';
  }
});
