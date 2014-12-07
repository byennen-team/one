// Template.documents.rendered({
//   var dropzone = new Dropzone(document.body, { // Make the whole body a dropzone
//     url: "/upload/url", // Set the url
//     previewsContainer: "#previews", // Define the container to display the previews
//     clickable: "#clickable" // Define the element that should be used as click trigger to select files.
//   });
// });

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

Template.documents.rendered = function () {
  $(document.body).on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();

    e.originalEvent.dataTransfer.dropEffect = 'copy';
  });

  $(document.body).on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.originalEvent.dataTransfer.files;
    for (var i = 0, file; file = files[i]; i++) {
      var method = Routes.getName() === Routes.MY_DOCUMENTS ? 'signUserFileUpload' : 'signCompanyFileUpload';
      FileTools.upload(method, file);
    }
  });

  // TODO folders
  // TODO setup progress
  // TODO overwriting files
};

Template.documents.destroyed = function () {
  $(document.body).off('dragover');
  $(document.body).off('drop');
};
