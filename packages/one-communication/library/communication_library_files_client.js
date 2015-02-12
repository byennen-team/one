Template.libraryFiles.created = function () {
  Session.setDefault('libraryFilesSelectedCategory', 'My Docs');
};

Template.libraryFiles.rendered = function(){
  this.$(".library-files-sleeve").mCustomScrollbar({
  	theme:"one-light",
  	scrollbarPosition: "inside"
  });
};

Template.libraryFiles.helpers({

  documentsListOptions: function () {
    if (Session.get('libraryFilesSelectedCategory') === 'Company Docs') {
      return DocumentSubscriptions.getCompanyLibraryDocumentsListOptions();
    } else {
      return DocumentSubscriptions.getMyLibraryDocumentsListOptions();
    }
  },

  documents: function () {
    if (Session.get('libraryFilesSelectedCategory') === 'Company Docs') {
      return Files.find(
        {companyDocument: true}
      );
    } else {
      return Files.find(
        {companyDocument: false}
      );
    }
  },

  selectedCategory: function () {
    return Session.get('libraryFilesSelectedCategory');
  }

});

Template.libraryFiles.events({

  'click [data-action="select-my-docs"]': function (event) {
    event.preventDefault();
    Session.set('libraryFilesSelectedCategory', 'My Docs');
  },

  'click [data-action="select-company-docs"]': function (event) {
    event.preventDefault();
    Session.set('libraryFilesSelectedCategory', 'Company Docs');
  }

});
