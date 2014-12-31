Template.profileContact.events({
  'submit form': function (event, template) {
    event.preventDefault();
    var email = template.find('[id=contact-email]').value;
    console.log("clicked the button");
    Meteor.call('sendProfileContactEmail');
    // Meteor.call('sendProfileContactEmail', 'le@gooneapp.com', email, 'Hello!');

  }
});
