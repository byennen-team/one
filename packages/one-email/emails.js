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
              "name": "PHONE",
              "content": phone
            },
            {
              "name": "TEXT",
              "content": message
            }
          ]
        }]
      }
    });
  },

  'sendDocumentsSharedWithYouNotification': function (options) {
    check(options, {
      subject: String,
      to: String,
      senderName: String,
      sharedDocuments: String
    });

    // TODO: Text version of the mail
    return Meteor.Mandrill.sendTemplate({
      "template_name": "DocumentsSharedWithYouNotification",
      "template_content": [],
      "message": {
        "from_email": defaultEmail,
        "subject": options.subject,
        "merge": "true",
        "to": [{
          "email": options.to
        }],
        "merge_vars": [{
          "rcpt": options.to,
          "vars": [
            {
              "name": "SENDER_NAME",
              "content": options.senderName
            },
            {
              "name": "SHARED_DOCUMENTS",
              "content": options.sharedDocuments
            }
          ]
        }]
      }
    });
  },

  'sendYouSharedDocumentsNotification': function (options) {
    check(options, {
      subject: String,
      to: String,
      senderName: String,
      sharedDocuments: String
    });

    // TODO: Text version of the mail
    return Meteor.Mandrill.sendTemplate({
      "template_name": "YouSharedDocumentsNotification",
      "template_content": [],
      "message": {
        "from_email": defaultEmail,
        "subject": options.subject,
        "merge": "true",
        "to": [{
          "email": options.to
        }],
        "merge_vars": [{
          "rcpt": options.to,
          "vars": [
            {
              "name": "SHARED_WITH_NAME",
              "content": options.sharedWithName
            },
            {
              "name": "SHARED_DOCUMENTS",
              "content": options.sharedDocuments
            }
          ]
        }]
      }
    });
  }
});
