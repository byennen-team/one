Meteor.methods({
  /**
   * Create a signature to upload the current user's profile picture to s3.
   */
  signProfilePictureUpload: function (fileName, mimeType) {
    check(fileName, String);
    check(mimeType, String);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');

    // TODO grab company name
    var companyName = 'elliman';

    var filePath = Folder.profilePicture(companyName, user._id) + '/' + Random.id() + '.' + FileTools.ext(fileName);
    return FileTools.signUpload(filePath, mimeType);
  }
});
