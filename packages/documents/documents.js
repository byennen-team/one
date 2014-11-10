Template.documents.events({
  'click .upload': function (event, template) {
    template.find('input').click();
  },

  'change input[type=file]': function (event) {
    var method = Routes.getName() === Routes.MY_DOCUMENTS ? 'signUserFileUpload' : 'signCompanyFileUpload';
    FileTools.upload(method, event.target.files[0]);
  },

  'click input[type=checkbox]': function (event) {
    var checkbox = event.target;

    var file = Blaze.getElementData(checkbox);
    Meteor.call('favoriteDocument', file._id, checkbox.checked);
  }
});

Template.documents.helpers({
  isFavoriteChecked: function (file) {
    var user = Meteor.user();
    if (user && user.favoriteDocumentIds && user.favoriteDocumentIds.indexOf(file._id) > -1) return 'checked';
  },
  favorite: function () {
    var user = Meteor.user();
    if (!user || !user.favoriteDocumentIds) return [];

    return Files.find({
      _id: {$in: user.favoriteDocumentIds}
    })
  },
  files: function () {
    return Files.find({companyDocument: Routes.getName() === Routes.COMPANY_DOCUMENTS});
  },
  url: function (file) {
    var folder;

    if (Routes.getName() === Routes.MY_DOCUMENTS) {
      folder = Folder.userDocument('elliman', Meteor.userId());
    } else {
      folder = Folder.companyDocument('elliman');
    }

    return FileTools.url(folder + '/' + file.name);
  }
});