Template.login.events({
  'submit form': function (event, template) {
    event.preventDefault();
    var agentId = template.find('#agentID').value;
    agentId = parseInt(agentId);
    Meteor.loginWithElliman(agentId, function (error) {
      //TODO: better error messages. Maybe setup flash notications.
      // console.log(error);
      // $('.error').show();
    });
  }
});
