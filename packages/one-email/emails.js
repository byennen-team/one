var defaultEmail = "no-reply@gooneapp.com";

Meteor.methods({
  // Profile Contact Email
  // TODO: Refactor arguments to options hash
  'sendProfileContactEmail': function(
    to,
    subject,
    senderName,
    sender,
    phone,
    buyOrSell,
    message
  ){
    check(
      [to, subject, senderName, buyOrSell, sender, phone, message],
      [String]
    );

    return Meteor.Mandrill.sendTemplate({
      "template_name": "ContactFormNotification",
      "template_content": [{
        "name": senderName,
        "content": message
      }],
      "message": {
        "from_email": defaultEmail,
        "subject": subject,
        "text": message,
        "merge": "true",
        "to": [{
          "email": to
        }],
        "merge_vars": [{
          "rcpt": to,
          "vars": [
            {
              "name": "NAME",
              "content": senderName
            },
            {
              "phone": "PHONE",
              "content": phone
            }
          ]
        }]
      }
    });
  }
});
