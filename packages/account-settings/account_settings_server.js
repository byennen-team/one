Meteor.methods({
  /**
   * Create a signature to upload the current user's profile picture to s3.
   */
  signProfilePictureUpload: function (fileName, mimeType) {
    check(fileName, String);
    check(mimeType, String);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');

    var filePath = Folder.profilePicture(user._id) + '/' + Random.id() + '.' + FileTools.ext(fileName);
    return FileTools.signUpload(filePath, 'public-read', mimeType);
  }
});
