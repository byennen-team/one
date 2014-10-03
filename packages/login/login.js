Template.login.events({
  'submit form': function (event, template) {
    event.preventDefault();
    agentID = template.find('#agentID').value;
    console.log('Agent ID: ' + agentID);
  }
});
