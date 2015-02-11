Template.libraryFile.helpers({

  isImage: function () {
    var document = Template.currentData();

    return FileTools.isImage(document);
  },

  fileTypeIconClass: function () {
    var document = Template.currentData();
    var extension = FileTools.ext(document.name);

    return FileTools.getFileTypeIcon(extension);
  }

});
