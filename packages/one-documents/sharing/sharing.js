/* globals SharedDocuments: true, SharedDocument: true */

SharedDocuments = new Meteor.Collection('sharedDocuments', {
  transform: function (data) {
    return new SharedDocument(data);
  }
});

SharedDocument = function (data) {
  _.extend(this, data);
};

SharedDocument.schema = new SimpleSchema({
  sharedDocumentId: {
    type: String
  },
  senderId: {
    type: String
  },
  receiverId: {
    type: String,
    optional: true
  },
  receiverEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  isAccepted: {
    type: Boolean,
    defaultValue: false
  },
  lastReminderSentAt: {
    type: Date,
    optional: true
  },
  accessToken: {
    type: String,
    optional: true
  }
});
