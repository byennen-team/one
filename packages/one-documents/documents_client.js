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
  'click [data-action="accept-shared-document"]': function () {
    var sharedDocumentIds = SharedDocuments
      .find()
      .map(function (sharedDocument) {
        return sharedDocument._id;
      });
    Meteor.call('acceptSharedDocuments', sharedDocumentIds);
  },
  'click .upload': function (event, template) {
    template.find('input').click();
  },
  'change input[type=file]': function (event) {
    uploadFile(event.target.files[0]);
  },
});

Template.documents.helpers({
  documentsListOptions: function () {
    if (Routes.getName() === Routes.SHARED_DOCUMENTS) {
      return getSharedDocumetsListOptions();
    } else if (FileTools.isMyDocumentsActive()) {
      return getMyLibraryDocumentsListOptions();
    } else if (FileTools.isCompanyDocumentsActive()) {
      return getCompanyLibraryDocumentsListOptions();
    } else {
      throw new Error('Unknown documents page type');
    }
  },
  moveToActionState: function () {
    var selectedDocuments = Session.get('selectedDocuments') || [];

    return _.isEmpty(selectedDocuments) ? 'hidden' : '';
  },
  acceptSharedDocumentState: function () {
    if (Routes.getName() !== Routes.SHARED_DOCUMENT ||
        SharedDocumentsStore.haveAllBeenAccepted()
    ) {
      return 'hidden';
    } else {
      return '';
    }
  },
  favorite: function () {
    var user = Meteor.user();
    if (!user || !user.favoriteDocumentIds) return [];

    return Files.find({
      _id: {$in: user.favoriteDocumentIds}
    });
  },
  files: function () {
    // TODO: Refactor shared document into own template
    if (Routes.getName() === Routes.SHARED_DOCUMENT) {
      var sharedDocumentFileIds = SharedDocuments
        .find()
        .map(function (sharedDocument) {
          return sharedDocument.sharedDocumentId;
        });

      return Files.find(
        {_id: {$in: sharedDocumentFileIds}},
        {sort: {uploadDate: -1}}
      );
    }
  }
});

function getSharedDocumetsListOptions() {
  return {
    subscription: {
      name: 'sharedDocuments',
      arguments: []
    },
    cursor: Files.find(
      {
        'sharedWith.userId': Meteor.userId(),
        'sharedWith.isInherited': false
      },
      {sort: {uploadDate: -1}}
    )
  };
}

function getMyLibraryDocumentsListOptions() {
  return {
    subscription: {
      name: 'myLibraryDocuments',
      arguments: [Session.get('currentFolderId')]
    },
    cursor: Files.find({
      companyDocument: false,
      archived: {$ne: true},
      parent: Session.get('currentFolderId')
    })
  };
}

function getCompanyLibraryDocumentsListOptions() {
  return {
    subscription: {
      name: 'companyLibraryDocuments',
      arguments: [Session.get('currentFolderId')]
    },
    cursor: Files.find({
      companyDocument: true,
      archived: {$ne: true},
      parent: Session.get('currentFolderId')
    })
  };
}

Template.documents.rendered = function () {
  $(document.body).on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();

    e.originalEvent.dataTransfer.dropEffect = 'copy';
  });

  $(document.body).on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();

    if (e.originalEvent.dataTransfer) {
      var files = e.originalEvent.dataTransfer.files;
      for (var i = 0; i < files.length; i++) uploadFile(files[i]);
    }
  });
};

Template.documents.destroyed = function () {
  $(document.body).off('dragover');
  $(document.body).off('drop');
};
