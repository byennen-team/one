
/*****************************************************************************/
/* Application: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Application.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
  }
});

Template.Application.helpers({

});

/*****************************************************************************/
/* Application: Lifecycle Hooks */
/*****************************************************************************/
Template.Application.created = function () {
};

Template.Application.rendered = function () {
};

Template.Application.destroyed = function () {
};
