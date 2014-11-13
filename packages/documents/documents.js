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

    var file = Blaze.getData(checkbox);
    Meteor.call('favoriteDocument', file._id, checkbox.checked);
  },
  'click .print': function (event, template) {
    event.preventDefault();
    var file = window.open(event.target.getAttribute("href"));
    file.print();
  },
  'click .download': function (event) {
    event.preventDefault();
    var a = $("<a>").attr("href", event.target.getAttribute("href")).attr("download", "img.png").appendTo("body");
    a[0].click();
    a.remove();
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
  },
  date: function (file) {
    return moment(file.uploadDate).format('MMM D, YYYY');
  },
  type: function (file) {
    return file.name.split('.').pop();
  }
});
