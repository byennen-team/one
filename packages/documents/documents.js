Template.documents.events({
  'click .upload': function (event, template) {
    template.find('input').click();
  },

  'change input': function (event) {
    var method = Routes.getName() === Routes.MY_DOCUMENTS ? 'signUserFileUpload' : 'signCompanyFileUpload';
    FileTools.upload(method, event.target.files[0]);
  }
});

Template.documents.helpers({
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