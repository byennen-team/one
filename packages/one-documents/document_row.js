Template.documentRow.events({

  'click [data-action="toggle-checkbox"]': function (event) {
    event.preventDefault(); // Don't select the checkbox automatically
    var toggledDocument = Blaze.getData(event.target);
    toggleSelection(toggledDocument);
  },

  //  Selects hidden checkbox when div is clicked
  'click [data-action="toggle-row"]': function (event) {
    var toggledDocument = Blaze.getData(event.target);
    toggleSelection(toggledDocument);
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

  'click [data-action="share-document"]': function (event) {
    var document = Blaze.getData(event.target);
    updateSharedDocumentUrl(document);
    Modal.show('shareDocumentModal', {document: document});
  },

  'click .rename-document': function (event) {
    var document = Blaze.getData(event.target);
    Session.set('selectedFileId', document._id);
  },

  'click .remove': function (event) {
    event.preventDefault();
    var document = Blaze.getData(event.target);
    Meteor.call('archiveDocument',document._id, true, function(error) {
      if (error)
        alert("could not delete document");
    });
  },

  'click [data-action="email-document"]': function (event) {
    var document = Blaze.getData(event.target);
    updateSharedDocumentUrl(document);
    Modal.show('emailDocumentModal');
  },

  'mouseover td.name': function () {
    // TODO: Lance finish front end
    console.log('hover');
    // $(".edit").show();
  }

});

function toggleSelection(document) {
  var documentId = document._id;
  var selectedDocuments = Session.get('selectedDocuments') || [];

  if (_.contains(selectedDocuments, documentId)) {
    selectedDocuments = _.without(selectedDocuments, documentId);
  } else {
    selectedDocuments.push(documentId);
  }

  Session.set('selectedDocuments', selectedDocuments);
}

function selectDocument(document) {
  var documentId = document._id;
  var selectedDocuments = Session.get('selectedDocuments') || [];

  if (!_.contains(selectedDocuments, documentId)) {
    selectedDocuments.push(documentId);
  }

  Session.set('selectedDocuments', selectedDocuments);
}

function updateSharedDocumentUrl(document) {
  Session.set('sharedDocumentUrl');

  Meteor.call(
    'sharedDocumentUrl', document._id, function (error, result) {
      Session.set('sharedDocumentUrl', result);
    }
  );
}

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

Template.documentRow.rendered = function () {
  // Make row draggable
  $(this.firstNode).draggable({
    cursor: 'move',
    cursorAt: { top: -12, left: -20 },
    helper: function () {
      var selectedDocuments = Session.get('selectedDocuments');
      var helperText;
      if (_.isEmpty(selectedDocuments)) {
        helperText = "Move '" + Blaze.getData(this).name + "'";
      } else {
        helperText = 'Move ' + selectedDocuments.length + ' items';
      }

      return $("<div class='documentRowDragHelper'>" + helperText + "</div>");
    }
  });

  if (this.data.isFolder) {
    // Make row droppable
    $(this.firstNode).droppable({
      activeClass: "dropzone",
      hoverClass: "documentRow--dragHover",
      drop: function(event, ui) {
        var selectedDocuments = Session.get('selectedDocuments');
        var documentsToMove = _.isEmpty(selectedDocuments) ?
          [Blaze.getData(ui.draggable.get(0))._id] :
          selectedDocuments;
        var targetFolder = Blaze.getData(this)._id;
        Meteor.call('moveTo', documentsToMove, targetFolder, function (error) {
          if (error) {
            console.error(error);
          }
        });
      }
    });
  }
};
