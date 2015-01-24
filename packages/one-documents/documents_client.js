// TODO folders

var updateProgress = function (fileRow, progress) {
  var element = fileRow.find('.progress');

  if (progress < 100) {
    element.removeClass('hide');
    element.find('div')
      .attr('aria-valuenow', progress)
      .width(progress + '%')
      .text(progress + '%');
  }
  else {
    element.addClass('hide');
  }
};

var uploadFile = function (file) {
  var companyDocument = FileTools.isCompanyDocumentsActive();

  var existingFile = Files.findOne({
    name: file.name,
    companyDocument: companyDocument
  });
  if (existingFile) {
    var success = confirm(
      'There is already a file named "' + file.name +
      '". Do you want to overwrite it?'
    );
    if (!success) return;
    Files.remove(existingFile._id);
  }

  var method = companyDocument ?
    'signCompanyDocumentUpload' :
    'signUserDocumentUpload';

  var fileRow;
 FileTools.upload(method, file, {
    parentFolderId: Session.get('currentFolderId'),
    // TODO handle error
    //onError: function (error) {
    //
    //},
    onProgress: function (progressEvent) {
      var progress = Math.floor(
        progressEvent.loaded / progressEvent.total * 100
      );
      updateProgress(fileRow, progress);
    },
    onComplete: function (fileId) {
      fileRow = $('#row-' + fileId);
    }
  });
};

Template.documents.events({
  'click .upload': function (event, template) {
    template.find('input').click();
  },
  'change input[type=file]': function (event) {
    uploadFile(event.target.files[0]);
  },
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

Template.documents.helpers({
  moveToActionState: function () {
    var selectedDocuments = Session.get('selectedDocuments') || [];

    return _.isEmpty(selectedDocuments) ? 'hidden' : '';
  },
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
  favorite: function () {
    var user = Meteor.user();
    if (!user || !user.favoriteDocumentIds) return [];

    return Files.find({
      _id: {$in: user.favoriteDocumentIds}
    });
  },
  files: function () {
    return Files.find(
      {
        companyDocument: FileTools.isCompanyDocumentsActive(),
        archived: {$ne: true},
        parent: Session.get('currentFolderId')
      },
      {
        sort: {uploadDate: -1}
      }
    );
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
    for (var i = 0; i < files.length; i++) uploadFile(files[i]);
  });
};

Template.documents.destroyed = function () {
  $(document.body).off('dragover');
  $(document.body).off('drop');
};
