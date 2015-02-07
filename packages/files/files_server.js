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
  var policyBase64 = new Buffer(JSON.stringify(policy), 'utf8')
    .toString('base64');
  var signature =
    crypto.createHmac('sha1', Meteor.settings.AWS_SECRET_ACCESS_KEY)
      .update(policyBase64)
      .digest('base64');

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
  var dateTime = Math.floor(new Date().getTime() / 1000) +
    Meteor.settings.S3_URL_EXPIRATION_SECONDS;
  var stringToSign = 'GET\n\n\n' + dateTime + '\n' + filePath;
  var signature = awsSignature(stringToSign);
  var queryString = '?AWSAccessKeyId=' + Meteor.settings.AWS_ACCESS_KEY_ID +
    '&Expires=' + dateTime +
    '&Signature=' + encodeURIComponent(signature);
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
// TODO: Move to DocumentTools?
FileTools.createFolder = function (
  folderName,
  userId,
  parentFolderId,
  isCompanyDocument
) {
  parentFolderId = parentFolderId || null;

  var ancestors = [];
  if (parentFolderId) {
    var parentFolder = Files.findOne(parentFolderId);
    if (!parentFolder) {
      throw new Meteor.Error('PARENT_FOLDER_NOT_FOUND');
    } else if (!parentFolder.isFolder) {
      throw new Meteor.Error('PARENT_FOLDER_IS_NOT_A_FOLDER');
    } else {
      ancestors = (parentFolder.ancestors || []).concat([parentFolderId]);
    }
  }

  return Files.insert({
    companyDocument: !!isCompanyDocument,
    name: folderName,
    uploadDate: new Date(),
    userId: userId,
    isFolder: true,
    parent: parentFolderId,
    ancetors: ancestors
  });
};

// TODO: Move to DocumentTools?
FileTools.moveDocumentsTo = function (documentsToMoveIds, targetFolderId) {
  documentsToMoveIds = _.without(documentsToMoveIds, targetFolderId);

  _.forEach(documentsToMoveIds, function (documentToMoveId) {
    FileTools.moveDocumentTo(documentToMoveId, targetFolderId);
  });
};

/**
 * Moves a document (file or folder) into a new target folder.
 * When the targetFolderId is null it means that the document
 * is moved into the root.
 * @param documentToMoveId
 * @param targetFolderId
 */
FileTools.moveDocumentTo = function (documentToMoveId, targetFolderId) {
  if (documentToMoveId === targetFolderId) {
    throw new Meteor.Error('DOCUMENT_CANNOT_BE_MOVED_INTO_ITSELF');
  }

  var documentToMove = Files.findOne(documentToMoveId);

  if (!documentToMove) {
    throw new Meteor.Error('DOCUMENT_TO_MOVE_NOT_FOUND');
  }

  var newAncestors = [];
  if (targetFolderId) {
    var targetFolder = Files.findOne(targetFolderId);

    if (!targetFolder) {
      throw new Meteor.Error('TARGET_FOLDER_NOT_FOUND');
    } else if (!targetFolder.isFolder) {
      throw new Meteor.Error('TARGET_FOLDER_IS_NOT_A_FOLDER');
    }

    newAncestors = (targetFolder.ancestors || []).concat([targetFolderId]);
  }

  Files.update(
    {_id: documentToMoveId},
    {$set: {
      parent: targetFolderId,
      ancestors: newAncestors
    }}
  );

  if (documentToMove.isFolder) {
    updateAncestorsOfFolderChildren(
      documentToMoveId,
      newAncestors
    );
  }
};

function updateAncestorsOfFolderChildren(parentFolderId, newParentAncestors) {
  Files
    .find({ancestors: parentFolderId})
    .forEach(function (childDocumentToMove) {
      // Remove the ancestor part above the parent folder
      // and replace it with the newParentAncestors
      var index = childDocumentToMove.ancestors.indexOf(parentFolderId);
      var newAncestors = newParentAncestors.concat(
        childDocumentToMove.ancestors.slice(index)
      );

      Files.update(
        childDocumentToMove,
        {$set: {
          ancestors: newAncestors
        }}
      );
    });
}
