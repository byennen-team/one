Template.documentsBreadcrumb.helpers({
  isMyDocumentsActive: function () {
    return FileTools.isMyDocumentsActive();
  },

  isCompanyDocumentsRoute: function () {
    return Routes.getName() === Routes.COMPANY_DOCUMENTS;
  },

  isMyDocumentsRoute: function () {
    return Routes.getName() === Routes.MY_DOCUMENTS;
  },

  breadcrumbs: function () {
    var currentFolderId = Session.get('currentFolderId');
    var breadcrumbs = [];

    // Traverse the folder hierarchy up
    var folderId = currentFolderId;
    do {
      var folder = Files.findOne(folderId);
      if (folder) {
        breadcrumbs.unshift(folder);
        folderId = folder.parent;
      } else {
        folderId = null;
      }
    } while (folderId);

    return breadcrumbs;
  },

  isCurrentFolder: function () {
    return Template.currentData()._id === Session.get('currentFolderId');
  }
});
