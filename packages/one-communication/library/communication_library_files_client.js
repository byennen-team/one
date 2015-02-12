Template.libraryFiles.created = function () {
  Session.setDefault('libraryFilesSelectedCategory', 'My Docs');
  // Template level subscription for files
  /*
  this.autorun(function () {
    if (Session.get('libraryFilesSelectedCategory') === 'Company Docs') {
      // TODO: Subscribe to company docs
    } else {
      // TODO: Subscribe to my docs
    }
  });
  */
};

Template.libraryFiles.rendered = function(){
  this.$(".library-files-sleeve").mCustomScrollbar({
  	theme:"one-light",
  	scrollbarPosition: "inside"
  });
};

Template.libraryFiles.helpers({

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
