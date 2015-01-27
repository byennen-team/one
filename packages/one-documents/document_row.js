Template.documentRow.events({
  'click [data-action="select"]': function (event) {
    event.preventDefault(); // Don't select the checkbox automatically

    var newSelectedDocument = Blaze.getData(event.target);
    var newSelectedDocumentId = newSelectedDocument._id;
    var selectedDocuments = Session.get('selectedDocuments') || [];

    if (_.contains(selectedDocuments, newSelectedDocumentId)) {
      selectedDocuments = _.without(selectedDocuments, newSelectedDocumentId);
    } else {
      selectedDocuments.push(newSelectedDocumentId);
    }

    Session.set('selectedDocuments', selectedDocuments);
  },
  'click [data-action="favorite"]': function (event) {
    var checkbox = event.target;

    var file = Blaze.getData(checkbox);
    Meteor.call('favoriteDocument', file._id, checkbox.checked);
  },
  'click .print': function (event) {
    event.preventDefault();
    var file = window.open(event.target.getAttribute("href"));
    file.print();
  },
  'click .download': function (event) {
    event.preventDefault();
    var a = $('<a target="_blank">')
      .attr("href", event.target.getAttribute("href"))
      .attr("download", "img.png")
      .appendTo("body");
    a[0].click();
    a.remove();
  },
  'click .share-document': function (event) {
    Session.set('sharedDocumentUrl');

    var file = Blaze.getData(event.target);
    Meteor.call('sharedDocumentUrl', file._id, function (error, result) {
      Session.set('sharedDocumentUrl', result);
    });
  },
  'click .rename-document': function (event) {
    var file = Blaze.getData(event.target);
    Session.set('selectedFileId', file._id);
  },
  'click .remove': function (event) {
    event.preventDefault();
    var file = Blaze.getData(event.target);
    Meteor.call('archiveDocument',file._id, true, function(error) {
      if (error)
        alert ("could not delete file");
    });
  },
  'mouseover td.name': function () {
    // TODO: Lance finish front end
    console.log('hover');
    // $(".edit").show();
  }
});

Template.documentRow.helpers({
  isSelected: function (file) {
    var selectedDocuments = Session.get('selectedDocuments') || [];

    return _.contains(selectedDocuments, file._id);
  },
  isFavoriteChecked: function (file) {
    var user = Meteor.user();
    if (user &&
      user.favoriteDocumentIds &&
      user.favoriteDocumentIds.indexOf(file._id) > -1
    ) return 'checked';
  },
  url: function (file) {
    return FileTools.url(file);
  },
  date: function (file) {
    return moment(file.uploadDate).format('MMM D, YYYY');
  },
  type: function (file) {
    return file.isFolder ? 'folder' : file.name.split('.').pop();
  },
  isPersonalDocument: function (file) {
    return file.companyDocument === false;
  }
});

