Template.documentsMenu.helpers({

  myActive: function () {
    if (FileTools.isMyDocumentsActive()) {
      return "active";
    }
  },

  companyActive: function () {
    if (FileTools.isCompanyDocumentsActive()) {
      return "active";
    }
  },

  sharedWithMeActive: function () {
    if (FileTools.isSharedWithMeActive()) {
      return "active";
    }
  },

  documentsMenuClass: function () {
    if (FileTools.isMyDocumentsActive()) {
      return 'my-library';
    } else if (FileTools.isCompanyDocumentsActive()) {
      return 'company-library';
    } else if (FileTools.isSharedWithMeActive()) {
      return 'shared-with-me';
    } else {
      return '';
    }
  }

});
