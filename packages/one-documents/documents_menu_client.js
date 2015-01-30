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
  }

});