Template.login.events({
  'submit form': function (event, template) {
    event.preventDefault();

    var agentId = template.find('#agentID').value;
    agentId = parseInt(agentId);
    Meteor.loginWithElliman(agentId, function (error) {
      // XXX error handling
    });
  }
});