Template.libraryFiles.created = function () {
  Session.setDefault('libraryFilesSelectedCategory', 'My Docs');
};

Template.libraryFiles.rendered = function () {
  var templateInstance = this;

  this.$(".library-files-sleeve").mCustomScrollbar({
  	theme:"one-light",
  	scrollbarPosition: "inside"
  });

  // Scroll to the top when the current folder changes
  this.autorun(function () {
    Session.get('currentFolderId');
    templateInstance.$(".library-files-sleeve")
      .mCustomScrollbar('scrollTo', 'top');
  });
};

Template.libraryFiles.helpers({

  documentsListOptions: function () {
    var options;

    if (Session.get('libraryFilesSelectedCategory') === 'Company Docs') {
      options = DocumentSubscriptions.getCompanyLibraryDocumentsListOptions();
    } else {
      options = DocumentSubscriptions.getMyLibraryDocumentsListOptions();
    }

    return options;
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
