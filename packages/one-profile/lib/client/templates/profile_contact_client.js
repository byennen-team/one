Template.profileContact.events({
  'submit form': function (event, template) {
    event.preventDefault();
    // TODO: Add user email "to", Add phone number to email, Add Buyer & Seller, Add error messaging
    var to = "dev-team@gooneapp.com"
    var name = template.find('[id=contact-name]').value;
    var email = template.find('[id=contact-email]').value;
    var subject = "Go One - Profile Contact from: " + name
    var htmlText = template.find('[id=contact-textarea]').value;
    Meteor.call('sendProfileContactEmail', to, subject, htmlText);
    $('#contact-success').modal('show');
  }
});
