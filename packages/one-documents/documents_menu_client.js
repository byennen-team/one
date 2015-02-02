Template.documentsMenu.helpers({

  myActive: function () {
    if (FileTools.isMyDocumentsActive()) {
      return "active";
    }
  },

  companyActive: function () {
    if (! FileTools.isMyDocumentsActive()) {
      return "active";
    }
  },

  documentsMenuClass: function () {
    return FileTools.isMyDocumentsActive() ? 'myDocuments' : '';
  }

});
