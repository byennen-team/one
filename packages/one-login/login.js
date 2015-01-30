Template.login.created = function() {
  this.error = new ReactiveVar();
};

Template.login.helpers({
  error: function() {
    return Template.instance().error.get();
  }
});

Template.login.events({
  'submit form': function (event, template) {
    event.preventDefault();
    var agentId = template.find('#agentID').value;
    var agentEmail = template.find('#agentEmail').value;
    agentId = parseInt(agentId);
    Meteor.loginWithElliman(agentId, agentEmail, function (error) {
      //TODO: better error messages. Maybe setup flash notications.
      if (error) {
        template.error.set(error.error);
        $('.error').show();
      }
    });
  }
});
