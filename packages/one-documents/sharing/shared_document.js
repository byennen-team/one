/* globals
   SharedDocument: true,
   SecureRandomToken: false
*/

SharedDocument = function (data) {
  _.extend(this, data);
};

_.extend(SharedDocument.prototype, {

  getShareUrl: function () {
    var path = 'documents/shared/' +
      this.sharedDocumentId + '/' +
      this.accessToken;

    return Meteor.absoluteUrl(path);
  }

});

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
    autoValue: function () {
      if (!this.isSet) {
        return SecureRandomToken.generate();
      }
    }
  }
});
