/* globals SharedDocumentsStore: true */

/**
 * Encapsulates all logic regarding shared documents.
 */
SharedDocumentsStore = {

  haveAllBeenAccepted: function () {
    return SharedDocuments.find({isAccepted: false}).count() === 0;
  }

};
