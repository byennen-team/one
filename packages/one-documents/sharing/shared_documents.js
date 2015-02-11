/* globals SharedDocuments: true */

SharedDocuments = new Meteor.Collection('sharedDocuments', {
  transform: function (data) {
    return new SharedDocument(data);
  }
});

SharedDocuments.attachSchema(SharedDocument.schema);
