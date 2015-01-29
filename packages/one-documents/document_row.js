Template.documentRow.events({

// Jonas, we need to combine these two functions. I was targeting the checkbox
//  and changing the background color on .document-file-row click, but I didn't 
//  realize you weren't using the checkbox.
  // Original function - uses visible checkbox
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

  //  Selects hidden checkbox when div is clicked
  'click .document-file-row': function ( event ) {
    var $this = $( event.currentTarget );
    var $checkbox = $this.find( '.document-row-checkbox' );
    if( $checkbox.is( ':checked' ) ){ // if row was selected, turn it off
      $checkbox.prop( 'checked', false );
      $this.removeClass( 'selected' );
    }else {
      $checkbox.prop( 'checked', true );
      $this.addClass( 'selected' );
    }
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
