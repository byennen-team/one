var defaultEmail = "no-reply@gooneapp.com"

Meteor.methods({
  // Profile Contact Email
  // TODO: Setup Template
  'sendProfileContactEmail': function(to, subject, htmlText){
    return Meteor.Mandrill.send({
      to: to,
      from: defaultEmail,
      subject: subject,
      html: htmlText
    });
  }
});
