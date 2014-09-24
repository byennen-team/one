Meteor.subscribe('Agents');

Template.LoginElliman.events({
  'submit form' : function(event, template) {
    event.preventDefault();
    var agentID = template.find('#agentID').value;
    console.log('Agent ID: ' + agentID);
  }
});
