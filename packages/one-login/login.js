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
<<<<<<< HEAD
      console.assert(!error, 'error', error); return;
=======
      // console.log('error', error); return;
>>>>>>> b245f3b27448f0d1ce1f8aa16dbe810b9653b437
      //TODO: better error messages. Maybe setup flash notications.
      if (error) {
        template.error.set(error.error);
        $('.error').show();
      }
    });
  }
});
