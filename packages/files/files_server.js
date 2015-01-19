var crypto = Npm.require('crypto');
var s3 = new AWS.S3();
Meteor.publish('files', function () {
  // TODO filter by companyId
  return Files.find();
});

Files.allow({
  remove: function (userId, doc) {
    return doc.companyDocument || doc.userId === userId;
  }
});

/**
 * Create a signature to allow the client to upload
 * a public readable file in our S3 bucket.
 * @returns {{accessKey: *, policy: string, signature: *}}
 */
FileTools.signUpload = function (filePath, acl, mimeType) {
  var bucket = Meteor.settings.AWS_BUCKET;
  console.log('signupload bucket:', bucket);
  var policy = {
    // expire in 5 minutes
    expiration: new Date(new Date().getTime() + 1000 * 60 * 5).toISOString(),
    conditions: [
      {bucket: bucket},
      {key: filePath},
      {acl: acl},
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
    acl: acl,
    credentials: credentials
  };
};

var awsSignature = function (str) {
  var shasum = crypto.createHmac('sha1', Meteor.settings.AWS_SECRET_ACCESS_KEY);
  shasum.update(str);
  return shasum.digest('base64').trim();
};

/**
 * Return a signed url to read the filePath.
 */
FileTools.signedGet = function (filePath) {
  filePath = encodeURI('/' + Meteor.settings.AWS_BUCKET + '/' + filePath);
  var dateTime = Math.floor(new Date().getTime() / 1000) + Meteor.settings.S3_URL_EXPIRATION_SECONDS;
  var stringToSign = 'GET\n\n\n' + dateTime + '\n' + filePath;
  var signature = awsSignature(stringToSign);
  var queryString = '?AWSAccessKeyId=' + Meteor.settings.AWS_ACCESS_KEY_ID + '&Expires=' + dateTime + '&Signature=' + encodeURIComponent(signature);
  var url = 'https://s3.amazonaws.com' + filePath + queryString;
  return url;
};

FileTools.rename = function (originalFilePath, newFilePath, callback) {
  var boundCallback = Meteor.bindEnvironment(function (err, res) {
    callback(err, res);
  });

  s3.copyObject({
    ACL: 'private',
    Bucket: Meteor.settings.AWS_BUCKET,
    CopySource: Meteor.settings.AWS_BUCKET + '/' + originalFilePath,
    Key: newFilePath
  }, function (error) {
    if (error) {
      boundCallback(error);
      return;
    }

    s3.deleteObject({
      Bucket: Meteor.settings.AWS_BUCKET,
      Key: originalFilePath
    }, function (err, data) {
      if (err) {
        boundCallback(err);
        return;
      }

      boundCallback(null, data);
    });
  });
};


FileTools.delete = function (filePath, callback) {
  var boundCallback = Meteor.bindEnvironment(function (err, res) {
    callback(err, res);
  });

  s3.deleteObject({
      Bucket: Meteor.settings.AWS_BUCKET,
      Key: filePath
    }, function (err, data) {
      if (err) {
        boundCallback(err);
        return;
      }

      boundCallback(null, data);
    });
};

/**
 * Creates a folder.
 * @param {String} folderName The name of the folder.
 * @param {String} userId The user id of the owner.
 * @param {String} [parentFolderId] The id of the parentFolderId folder.
 * @param {Boolean} [isCompanyDocument] Is the folder a companyDocument?
 * @returns {String} The id of the created folder.
 */
FileTools.createFolder = function (folderName, userId, parentFolderId, isCompanyDocument) {
  parentFolderId = parentFolderId || null;

  return Files.insert({
    companyDocument: !!isCompanyDocument,
    name: folderName,
    uploadDate: new Date(),
    userId: userId,
    isFolder: true,
    parent: parentFolderId
  });
};
