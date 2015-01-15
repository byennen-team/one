AWS = Npm.require('aws-sdk');
AWS.config.region = Meteor.settings.AWS_REGION;
AWS.config.apiVersions = {
  ec2: '2014-09-01',
  s3: '2006-03-01'
};
AWS.config.update({
  accessKeyId: Meteor.settings.AWS_ACCESS_KEY_ID,
  secretAccessKey: Meteor.settings.AWS_SECRET_ACCESS_KEY
});
