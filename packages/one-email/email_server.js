// Setup Mandrill if not disabled email and warn the log.

var MANDRILL_USERNAME =  Meteor.settings.MANDRILL_USERNAME;
var MANDRILL_APIKEY = Meteor.settings.MANDRILL_API_KEY;
if(!MANDRILL_USERNAME || !MANDRILL_APIKEY) {
  console.warn("Could not find either MANDRILL_USERNAME or MANDRILL_APIKEY" +
  " environment variables. Emailing is disabled");
} else {
  Meteor.startup(function() {
    Meteor.Mandrill.config({
      username: MANDRILL_USERNAME,
      key: MANDRILL_APIKEY,
    });
  });
}
