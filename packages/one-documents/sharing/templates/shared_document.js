Template.sharedDocument.events({
  'click [data-action="accept-shared-document"]': function () {
    var sharedDocumentIds = SharedDocuments
      .find()
      .map(function (sharedDocument) {
        return sharedDocument._id;
      });
    Meteor.call('acceptSharedDocuments', sharedDocumentIds);
  }
});

Template.sharedDocument.helpers({
  areDocumentsSelected: function () {
    var selectedDocuments = Session.get('selectedDocuments') || [];

    return _.isEmpty(selectedDocuments) ? 'hidden' : '';
  },
  acceptSharedDocumentState: function () {
    if (Routes.getName() !== Routes.SHARED_DOCUMENT ||
        SharedDocumentsStore.haveAllBeenAccepted()
    ) {
      return 'hidden';
    } else {
      return '';
    }
  },
  favorite: function () {
    var user = Meteor.user();
    if (!user || !user.favoriteDocumentIds) return [];

    return Files.find({
      _id: {$in: user.favoriteDocumentIds}
    });
  },
  files: function () {
    var sharedDocumentFileIds = SharedDocuments
      .find()
      .map(function (sharedDocument) {
        return sharedDocument.sharedDocumentId;
      });

    return Files.find(
      {_id: {$in: sharedDocumentFileIds}},
      {sort: {uploadDate: -1}}
    );
  }
});
