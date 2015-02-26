Template.roomFile.helpers({

  isImage: function () {
    var document = Template.currentData();

    return FileTools.isImage(document);
  },

  fileTypeIconClass: function () {
    var document = Template.currentData();

    return FileTools.getFileTypeIcon(document);
  }

});
