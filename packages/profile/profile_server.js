Meteor.methods({
  /**
   * Create a signature to upload the current user's profile picture to s3.
   */
  signProfilePictureUpload: function (mimeType, fileExt) {
    check(mimeType, String);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');

    // TODO grab company name
    var companyName = 'elliman';

    return Meteor.wrapAsync(function (callback) {
      var fileName = Random.id();

      var filePath = Folder.profilePicture(companyName, user._id) + '/' + fileName + '.' + fileExt;
      var credentials = Files.signS3Upload(filePath, mimeType);
      callback(null, {
        filePath: filePath,
        credentials: credentials
      });
    })();
  }
});