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
  var companyDocument = Routes.getName() === Routes.COMPANY_DOCUMENTS;

  var existingFile = Files.findOne({name: file.name, companyDocument: companyDocument});
  if (existingFile) {
    if (!confirm('There is already a file named "' + file.name + '". Do you want to overwrite it?')) return;
    Files.remove(existingFile._id);
  }

  var method = companyDocument ? 'signCompanyDocumentUpload' : 'signUserDocumentUpload';

  var fileRow;
  FileTools.upload(method, file, function (error, fileId) {
    if (error) return; // TODO handle error
    fileRow = $('#row-' + fileId);
  }, function (progressEvent) {
    var progress = Math.floor(progressEvent.loaded / progressEvent.total * 100);
    updateProgress(fileRow, progress);
  });
};

Template.documents.events({
  'click .upload': function (event, template) {
    template.find('input').click();
  },

  'change input[type=file]': function (event) {
    uploadFile(event.target.files[0]);
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
    Meteor.call('archiveDocument',file._id, true, function(error,response) {
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
    return Files.find({companyDocument: Routes.getName() === Routes.COMPANY_DOCUMENTS, archived: {$ne: true}});
  },
  url: function (file) {
    var folder;

    if (Routes.getName() === Routes.MY_DOCUMENTS) {
      folder = Folder.userDocument(Meteor.userId());
    } else {
      // TODO: add company_id
      folder = Folder.companyDocument('elliman');
    }

    return FileTools.url(folder + '/' + file.name);
  },
  date: function (file) {
    return moment(file.uploadDate).format('MMM D, YYYY');
  },
  type: function (file) {
    return file.name.split('.').pop();
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
    for (var i = 0, file; file = files[i]; i++) uploadFile(file);
  });
};

Template.documents.destroyed = function () {
  $(document.body).off('dragover');
  $(document.body).off('drop');
};
