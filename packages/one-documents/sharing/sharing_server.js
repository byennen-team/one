/* globals DocumentSharing: true */

DocumentSharing = {

  shareDocuments: function (documentIds, receiver) {
    return _.map(documentIds, function (documentId) {
      return DocumentSharing.shareDocument(documentId, receiver);
    });
  },

  shareDocument: function (documentId, receiver) {
    var document = Files.findOne(documentId);

    if (!document) {
      throw new Meteor.Error('DOCUMENT_DOES_NOT_EXIST', null, documentId);
    }

    var sharedDocumentId = SharedDocuments.insert({
      sharedDocumentId: documentId,
      senderId: Meteor.userId(),
      receiverId: receiver._id,
      receiverEmail: receiver.email
    });

    if (receiver._id) {
      var sharedDocument = SharedDocuments.findOne(sharedDocumentId);
      DocumentSharing._createNotification(
        sharedDocument,
        document,
        Meteor.user(),
        receiver._id
      );
    }

    return sharedDocumentId;
  },

  _createNotification: function (sharedDocument, document, sender, receiverId) {
    var notification = document.isFolder ?
      Notify.messages.FOLDER_SHARED_WITH_YOU :
      Notify.messages.DOCUMENT_SHARED_WITH_YOU;

    Notify.addNotification(
      receiverId,
      {
        message: Notify.generateMessageText(
          notification.message,
          [sender.profile.firstName + ' ' + sender.profile.lastName]
        ),
        title: notification.title,
        link: sharedDocument.getShareUrl()
      }
    );
  },

  acceptDocument: function (sharedDocumentId) {
    var sharedDocument = SharedDocuments.findOne(sharedDocumentId);
    if (!sharedDocument) {
      throw new Meteor.Error('SHARED_DOCUMENT_NOT_FOUND');
    }

    if (!sharedDocument.isAccepted) {
      var sharedDocumentFile = Files.findOne(sharedDocument.sharedDocumentId);

      if (sharedDocumentFile) {
        var shareRule = {
          userId: Meteor.userId(),
          access: FileAccess.WRITE, // TODO: Make this an option
        };

        DocumentSharing._updateShareRuleForDocument(
          sharedDocument.sharedDocumentId,
          _.defaults({isInherited: false}, shareRule)
        );

        if (sharedDocumentFile.isFolder) {
          DocumentSharing._updateShareRuleForChildDocuments(
            sharedDocument.sharedDocumentId,
            _.defaults({isInherited: true}, shareRule)
          );
        }
      }
      // TODO: Handle case when shared file has been deleted

      SharedDocuments.update(sharedDocumentId, {$set: {isAccepted: true}});
    }
  },

  _updateShareRuleForDocument: function (documentId, shareRule) {
    // First remove the old share rule for the user
    Files.update(
      documentId,
      {$pull: {sharedWith: {
        userId: shareRule.userId
      }}}
    );

    // Then add the new share rule for the user
    Files.update(
      documentId,
      {$push: {sharedWith: shareRule}}
    );
  },

  _updateShareRuleForChildDocuments: function (parentDocumentId, shareRule) {
    // First remove the old share rule for the user
    Files.update(
      {ancestors: parentDocumentId},
      {$pull: {sharedWith: {
        userId: shareRule.userId
      }}},
      {multi: true}
    );

    // Then add the new share rule for the user
    Files.update(
      {ancestors: parentDocumentId},
      {$push: {sharedWith: shareRule}},
      {multi: true}
    );
  },

  sendDocumentsSharedWithYouEmail: function (
    sharedDocuments,
    sender,
    receiver
  ) {
    var subject = sharedDocuments.length === 1 ?
      'A document' :
      sharedDocuments.length + ' documents';
    subject += ' have been shared with you';

    Meteor.call(
      'sendDocumentsSharedWithYouNotification',
      {
        subject: subject,
        to: receiver.email,
        senderName: sender.profile.firstName, // TODO: Full name
        sharedDocuments: this._getSharedDocumentsEmailBlock(sharedDocuments)
      }
    );
  },

  sendDocumentsSharedWithYouReminderEmail: function (
    sharedDocuments,
    receiver
  ) {
    var subject = 'You need to accept ';
    subject += sharedDocuments.length === 1 ?
      'a document that has' :
      sharedDocuments.length + ' documents that have';
    subject += ' been shared with you';

    Meteor.call(
      'sendDocumentsSharedWithYouReminderNotification',
      {
        subject: subject,
        to: receiver.email,
        sharedDocuments: this._getSharedDocumentsEmailBlock(sharedDocuments)
      }
    );
  },

  sendYouSharedDocumentsEmail: function (
    sharedDocuments,
    sharer,
    receiver
  ) {
    var subject = 'You shared ';
    subject += sharedDocuments.length === 1 ?
      'a document' :
      sharedDocuments.length + ' documents';

    Meteor.call(
      'sendYouSharedDocumentsNotification',
      {
        subject: subject,
        to: sharer.emails[0].address,
        sharedWithName: receiver.email,
        sharedDocuments: this._getSharedDocumentsEmailBlock(sharedDocuments)
      }
    );
  },

  _getSharedDocumentsEmailBlock: function (sharedDocuments) {
    var sharedDocumentsText = _.map(sharedDocuments, function (sharedDocument) {
      return '* ' + sharedDocument.getShareUrl();
    }).join('\n\n');

    return sharedDocumentsText;
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

    DocumentSharing.sendDocumentsSharedWithYouEmail(
      sharedDocuments,
      Meteor.user(),
      receiver
    );

    DocumentSharing.sendYouSharedDocumentsEmail(
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

  return Files.find({'sharedWith.userId': this.userId});
});


SyncedCron.add({
  name: 'Send accept reminders for shared documents',
  schedule: function(parser) {
    return parser.text('every 1 hours');
  },
  job: function() {
    var sharedDocumentsThatNeedReminder = SharedDocuments.find({
      isAccepted: false,
      reminderSendCount: {$lt: 1},
      lastReminderSentAt: {$lt: moment().subtract(48, 'hours').toDate()}
    }).fetch();

    _(sharedDocumentsThatNeedReminder)
      .groupBy('receiverEmail')
      .forEach(function (sharedDocuments, receiverEmail) {
        DocumentSharing.sendDocumentsSharedWithYouReminderEmail(
          sharedDocuments,
          {email: receiverEmail}
        );
      }
    );

    return sharedDocumentsThatNeedReminder.length;
  }
});

SyncedCron.add({
  name: 'Expire shared documents that have been shared with users outside of ' +
        ' Go One after 30 days',
  schedule: function(parser) {
    return parser.text('every 1 days');
  },
  job: function() {
    return SharedDocuments.remove(
      {
        receiverId: null,
        sharedAt: {$lt: moment().subtract(30, 'days').toDate()}
      },
      {multi: true}
    );
  }
});
