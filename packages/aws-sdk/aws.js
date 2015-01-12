AWS = Npm.require('aws-sdk');
AWS.config.region = 'us-west-2';
AWS.config.update({
  accessKeyId: Meteor.settings.AWS_ACCESS_KEY_ID,
  secretAccessKey: Meteor.settings.AWS_SECRET_ACCESS_KEY
});