Meteor.startup(function() {
  return Meteor.Mandrill.config({
    username: Meteor.settings.MANDRILL_USERNAME,
    key: Meteor.settings.MANDRILL_API_KEY
  });
});

Meteor.methods({
  // 'sendProfileContactEmail': function(to, subject, htmlText){
  //   return Meteor.Mandrill.send({
  //     to: to,
  //     from: "no-reply@gooneapp.com",
  //     subject: subject,
  //     html: htmlText
  //   });
  // }
  'sendProfileContactEmail': function(){
    return Meteor.Mandrill.send({
      to: "byennen@gmail.com",
      from: "no-reply@gooneapp.com",
      subject: "subject",
      html: "htmlText"
    });
  }
});
