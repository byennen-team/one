var crypto = Npm.require('crypto');

Meteor.publish('files', function () {
  // TODO filter by companyId
  return Files.find();
});

/**
 * Create a signature to allow the client to upload
 * a public readable file in our S3 bucket.
 * @param filePath The file path.
 * @returns {{accessKey: *, policy: string, signature: *}}
 */
FileTools.signUpload = function (filePath, mimeType) {
  var bucket = Meteor.settings.AWS_BUCKET;

  var policy = {
    // expire in 5 minutes
    expiration: new Date(new Date().getTime() + 1000 * 60 * 5).toISOString(),
    conditions: [
      {bucket: bucket},
      {key: filePath},
      {acl: 'public-read'},
      ['eq', '$Content-Type', mimeType]
    ]
  };

  // Sign the policy with our secret.
  var policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');
  var signature = crypto.createHmac('sha1', Meteor.settings.AWS_SECRET_ACCESS_KEY).update(policyBase64).digest('base64');

  // Return the credentials.
  var credentials = {
    accessKey: Meteor.settings.AWS_ACCESS_KEY_ID,
    policy: policyBase64,
    signature: signature
  };

  return {
    filePath: filePath,
    credentials: credentials
  };
};