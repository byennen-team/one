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
  'click [data-action="show-move-to-modal"]': function () {
    Modal.show('documentsMoveToModal');
  },
  'click .upload': function (event, template) {
    template.find('input').click();
  },
  'change input[type=file]': function (event) {
    uploadFile(event.target.files[0]);
  },
});

Template.documents.helpers({
  moveToActionState: function () {
    var selectedDocuments = Session.get('selectedDocuments') || [];

    return _.isEmpty(selectedDocuments) ? 'hidden' : '';
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
