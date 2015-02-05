/* globals DocumentSharing: true */

DocumentSharing = {

  shareDocuments: function (documentIds, receiver) {
    var sharedDocumentsIds = [];

    _.forEach(documentIds, function (documentId) {
      var sharedDocumentId = SharedDocuments.insert({
        sharedDocumentId: documentId,
        senderId: Meteor.userId(),
        receiverId: receiver._id,
        receiverEmail: receiver.email
      });
      sharedDocumentsIds.push(sharedDocumentId);
    });

    return sharedDocumentsIds;
  },

  acceptDocument: function (sharedDocumentId) {
    var sharedDocument = SharedDocuments.findOne(sharedDocumentId);
    if (sharedDocument) {
      Files.update(
        sharedDocument.sharedDocumentId,
        {$addToSet: {sharedWith: Meteor.userId()}}
      );
      SharedDocuments.update(sharedDocumentId, {$set: {isAccepted: true}});
    } else {
      throw new Meteor.Error('SHARED_DOCUMENT_NOT_FOUND');
    }
  },

  sendDocumentsSharedEmail: function (sharedDocuments, sender, receiver) {
    var subject = sharedDocuments.length === 1 ?
      'A document' :
      sharedDocuments.length + ' documents';
    subject += ' have been shared with you';

    var sharedDocumentsText = _.map(sharedDocuments, function (sharedDocument) {
      return '* ' + sharedDocument.getShareUrl();
    }).join('\n\n');

    Meteor.call(
      'sendSharedDocumentsNotification',
      {
        subject: subject,
        to: receiver.email,
        senderName: sender.profile.firstName, // TODO: Full name
        sharedDocuments: sharedDocumentsText
      }
    );
  }
};

Meteor.methods({

  shareDocuments: function (documentIds, receiver) {
    check(documentIds, [String]);
    check(receiver, {
      _id: Match.Optional(String),
      email: String
    });

    var sharedDocumentIds = DocumentSharing.shareDocuments(
      documentIds,
      receiver
    );
    var sharedDocuments = SharedDocuments
      .find({_id: {$in: sharedDocumentIds}})
      .fetch();
    DocumentSharing.sendDocumentsSharedEmail(
      sharedDocuments,
      Meteor.user(),
      receiver
    );
  },

  acceptSharedDocuments: function (sharedDocumentIds) {
    check(sharedDocumentIds, [String]);

    _.forEach(sharedDocumentIds, function (sharedDocumentId) {
      DocumentSharing.acceptDocument(sharedDocumentId);
    });
  }

});

/**
 * Publishes a sharedDocument and its associated file.
 * The publication is secured by the accessToken.
 */
Meteor.publishComposite(
  'sharedDocument',
  function (sharedDocumentId, accessToken) {
    check(sharedDocumentId, String);
    check(accessToken, String);

    return {
      find: function () {
        return SharedDocuments.find({
          _id: sharedDocumentId,
          accessToken: accessToken
        });
      },
      children: [
        {
          find: function (sharedDocument) {
            return Files.find({_id: sharedDocument.sharedDocumentId});
          }
        }
      ]
    };
  }
);

Meteor.publish('sharedDocuments', function () {
  if (!this.userId) {
    throw new Meteor.Error('USER_MUST_BE_LOGGED_IN');
  }

  return Files.find({sharedWith: this.userId});
});
