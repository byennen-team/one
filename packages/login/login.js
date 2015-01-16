Template.login.events({
  'submit form': function (event, template) {
    event.preventDefault();
    var agentId = template.find('#agentID').value;
    var agentEmail = template.find('#agentEmail').value;
    agentId = parseInt(agentId);
    Meteor.loginWithElliman(agentId, agentEmail, function (error) {
      console.log('error', error); return;
      //TODO: better error messages. Maybe setup flash notications.
      // console.log(error);
      // $('.error').show();
    });
  }
});
