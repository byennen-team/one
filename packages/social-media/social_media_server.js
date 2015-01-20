// Load Twitter settings from Settings file

ServiceConfiguration.configurations.upsert(
  { service: 'twitter' },
  { $set:
    { consumerKey: Meteor.settings.twitter.CONSUMER_KEY, secret: Meteor.settings.twitter.SECRET }
  });
