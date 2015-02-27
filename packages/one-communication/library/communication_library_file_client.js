Template.libraryFile.rendered = function () {
  // Make row draggable
  $(this.firstNode).draggable({
    appendTo: 'body',
    cursor: 'move',
    cursorAt: { top: -12, left: -20 },
    start: function (event, ui) {
      var document = Blaze.getData(this);
      ui.helper.data('type', 'attachment');
      ui.helper.data('attachmentId', document._id);
    },
    helper: function () {
      var helperText = "Attach '" + Blaze.getData(this).name + "'";

      return $(
        "<div class='library-file-drag-helper'>" + helperText + "</div>"
      );
    }
  });
};

Template.libraryFile.helpers({

  isImage: function () {
    var document = Template.currentData();

    return FileTools.isImage(document);
  },

  fileTypeIconClass: function () {
    var document = Template.currentData();

    return FileTools.getFileTypeIcon(document);
  }

});

Template.libraryFile.events({

  'click': function (event, templateInstance) {
    if (templateInstance.data.isFolder) {
      Session.set('currentFolderId', templateInstance.data._id);
    }
  }

});
