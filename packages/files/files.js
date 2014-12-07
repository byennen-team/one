Files = new Meteor.Collection('files');

Files.schema = new SimpleSchema({
  //companyId: {type: String, optional: true, regEx: SimpleSchema.RegEx.Id},
  companyDocument: {type: Boolean},
  name: {type: String},
  uploadDate: {type: Date},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id}
});

// Can't name this File or it will conflict with the HTML5 File.
FileTools = {};

FileTools.ext = function (fileName) {
  return fileName.substr(fileName.lastIndexOf('.') + 1);
};

/**
 * The url of the file.
 * @param filePath
 */
FileTools.url = function (filePath) {
  return 'files/' + encodeURIComponent(filePath);
};