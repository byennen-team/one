// TODO:
// - make email send

Template.profileContact.events({
  'submit form': function (event, template) {
    event.preventDefault();
    // TODO: Add user email "to"
    var to = "dev-team@gooneapp.com"
    var senderName = template.find('[id=contact-name]').value;
    var subject = "Go One - Profile Contact from: " + senderName
    var sender = template.find('[id=contact-email]').value;
    var phone = template.find('[id=contact-email]').value;
    var buyOrSell = template.find('input[name=buy-or-sell]:checked').value;
    var message = template.find('[id=contact-textarea]').value;
    console.log("Email To: " + to);
    console.log("Subject: " + subject);
    console.log("Senders Name: " + senderName);
    console.log("Senders Email: " + sender);
    console.log("Phone: " + phone);
    console.log("Type: " + buyOrSell);
    console.log("Message: " + message);

    Meteor.call('sendProfileContactEmail', to, subject, senderName, sender, phone, buyOrSell, message, function(error, result) {
      if (error) {
        $('#contact-fail').modal('show');
      } else {
        $('#contact-success').modal('show');
      }
    });
  }
});
