Files = {};

Files.ext = function (fileName) {
  return fileName.substr(fileName.lastIndexOf('.') + 1);
};

/**
 * The url of the file.
 * @param filePath
 */
Files.url = function (filePath) {
  return Meteor.settings.public.AWS_BUCKET_URL + '/' + filePath;
};