// Load Twitter settings from Settings file

ServiceConfiguration.configurations.upsert(
  { service: 'twitter' },
  { $set:
    { consumerKey: Meteor.settings.twitter.CONSUMER_KEY, secret: Meteor.settings.twitter.SECRET }
  });

Meteor.methods({
  saveCredentials: function(token, type) {
    check(token, String);
    check(type, String);

    var credentialSecret = Oauth._pendingCredentials.findOne({
      key: token
    });

    if (! credentialSecret)
      throw new Meteor.Error(500, 'Credentials not set');

    var credentials = (type === 'twitter') ?
      Twitter.retrieveCredential(token,credentialSecret.credentialSecret) :
      Facebook.retrieveCredential(token,credentialSecret.credentialSecret);

    if (!credentials)
      throw new Meteor.Error(500, 'Unknown twitter login Error');

    if (type === 'twitter')
      var options = { 'services.twitter' : credentials.serviceData };
    else
      var options = { 'services.facebook' : credentials.serviceData };


    Meteor.users.update( this.userId , {
      $set: options
    })

    return(null, true);
  }
})