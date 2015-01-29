Meteor.methods({
  favoriteDocument: function (fileId, favorite) {
    check(fileId, String);
    check(favorite, Boolean);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');

    var modifier = {
      favoriteDocumentIds: fileId
    };

    if (favorite) modifier = {$addToSet: modifier};
    else modifier = {$pull: modifier};

    Meteor.users.update(user._id, modifier);
  },
  archiveDocument: function (fileId, archive) {
    check(fileId, String);
    check(archive, Boolean);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');

    Files.update(
      {_id: fileId, companyDocument:false},
      {$set: {archived: archive}}
    );
  },
  renameDocument: function (fileId, newFileName) {
    check(fileId, String);
    check(newFileName, String);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');

    var file = Files.findOne(fileId);

    var folder = Folder.companyDocument('elliman');
    if (!file.companyDocument) {
      folder = Folder.userDocument(user._id);
    }

    FileTools.rename(
      folder + '/' + file.name, folder + '/' + newFileName,
      function (error) {
        if (error) return;

        Files.update(file._id, {$set: {name: newFileName}});
      }
    );
  },

  sharedDocumentUrl: function (fileId) {
    check(fileId, String);

    var userId = Meteor.userId();

    var file = Files.findOne(fileId);
    if (!file.companyDocument && file.userId !== userId)
      throw new Meteor.Error('Invalid credentials');

    return FileTools.signedGet(FileTools.path(file));
  },

  signCompanyDocumentUpload: function (fileName, mimeType, parentFolderId) {
    check(fileName, String);
    check(mimeType, String);
    check(parentFolderId, Match.Optional(Match.OneOf(String, null)));

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');
    validateFolderId(user, parentFolderId);

    // TODO grab company name
    var filePath = Folder.companyDocument('elliman') + '/' + fileName;

    var fileId = Files.insert({
      companyDocument: true,
      name: fileName,
      uploadDate: new Date(),
      userId: user._id,
      parent: parentFolderId
    });
    var signed = FileTools.signUpload(filePath, 'private', mimeType);
    signed.fileId = fileId;
    return signed;
  },

  signUserDocumentUpload: function (fileName, mimeType, parentFolderId) {
    check(fileName, String);
    check(mimeType, String);
    check(parentFolderId, Match.Optional(Match.OneOf(String, null)));

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');
    validateFolderId(user, parentFolderId);

    var filePath = '/'+Folder.userDocument(user._id) + '/' + fileName;

    var fileId = Files.insert({
      companyDocument: false,
      name: fileName,
      uploadDate: new Date(),
      userId: user._id,
      parent: parentFolderId
    });
    var signed = FileTools.signUpload(filePath, 'private', mimeType);
    signed.fileId = fileId;
    return signed;
  },

  createFolder: function (folderName, parentFolderId, isCompanyDocument) {
    check(folderName, String);
    check(parentFolderId, Match.Optional(Match.OneOf(String, null)));
    check(isCompanyDocument, Match.Optional(Boolean));

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');
    validateFolderId(user, parentFolderId);

    return FileTools.createFolder(
      folderName,
      user._id,
      parentFolderId,
      isCompanyDocument
    );
  },

  moveTo: function (documentIdsToMove, targetFolderId) {
    check(documentIdsToMove, [String]);
    check(targetFolderId, Match.OneOf(String, null));

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');
    validateFolderId(user, targetFolderId);

    // TODO: Validate the ownership of the documents

    return FileTools.moveTo(documentIdsToMove, targetFolderId);
  }
});

function validateFolderId(user, folderId) {
  // TODO: Is this correct for company documents?
  if (folderId && !isUserOwnerOfFile(user._id, folderId)) {
    throw new Meteor.Error('NOT_OWNER_OF_PARENT_FOLDER');
  }
}

function isUserOwnerOfFile(userId, fileId) {
  var file = Files.findOne(fileId);

  return file.userId === userId;
}
