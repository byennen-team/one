/* globals DocumentSubscriptions: true */

DocumentSubscriptions = {

  /**
   * Options for oneInfinitScrollList for shared documents.
   */
  getSharedDocumetsListOptions: function () {
    return {
      subscription: {
        name: 'sharedDocuments',
        arguments: []
      },
      cursor: Files.find(
        {
          'sharedWith.userId': Meteor.userId(),
          'sharedWith.isInherited': false
        },
        {sort: {_id: -1}}
      )
    };
  },

  /**
   * Options for oneInfinitScrollList for my library documents.
   */
  getMyLibraryDocumentsListOptions: function () {
    return {
      subscription: {
        name: 'myLibraryDocuments',
        arguments: [Session.get('currentFolderId')]
      },
      cursor: Files.find(
        {
          companyDocument: false,
          archived: {$ne: true},
          parent: Session.get('currentFolderId')
        },
        {sort: {_id: -1}}
      )
    };
  },

  /**
   * Options for oneInfinitScrollList for company library documents.
   */
  getCompanyLibraryDocumentsListOptions: function () {
    return {
      subscription: {
        name: 'companyLibraryDocuments',
        arguments: [Session.get('currentFolderId')]
      },
      cursor: Files.find(
        {
          companyDocument: true,
          archived: {$ne: true},
          parent: Session.get('currentFolderId')
        },
        {sort: {_id: -1}}
      )
    };
  },

  /**
   * Options for oneInfinitScrollList for company library documents.
   */
  getRoomDocumentsListOptions: function (room) {
    return {
      subscription: {
        name: 'roomDocuments',
        arguments: [room._id]
      },
      cursor: Files.find(
        {_id: {$in: room.documentIds}},
        {sort: {_id: -1}}
      )
    };
  }

};
