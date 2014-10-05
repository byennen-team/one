
/*****************************************************************************/
/* Application: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.application.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
  }
});

Template.application.helpers({
  profileUrl: function () {
    return getProfileUrl(Meteor.user());
  }
});

/*****************************************************************************/
/* Application: Lifecycle Hooks */
/*****************************************************************************/
Template.application.created = function () {
};

Template.application.rendered = function () {
};

Template.application.destroyed = function () {
};
