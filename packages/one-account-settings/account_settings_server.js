Meteor.methods({
  /**
   * Create a signature to upload the current user's profile picture to s3.
   */
  resizeNewProfileImage: function(newUrl) {
      check(newUrl, String);
      var user = Meteor.user();
      var _ext = '.'+FileTools.ext(newUrl);
      Meteor._powerQ.pause();
      Meteor._powerQ.add(function(done) {
        FileTools.fetchToTemp(newUrl, done);
      });
      Meteor._powerQ.add(function(done) {
        FileTools.resizeTemp('thumb_', done);
      });
      Meteor._powerQ.add(function(done){
        FileTools.upload(
          'thumb_',
          '/user/'+user.profile.id+'/profile-images/thumb_'+user.profile.id,
          done
        );
      });
      Meteor._powerQ.add(function(done) {
        FileTools.resizeTemp('full_', done);
      });
      Meteor._powerQ.add(function(done){
        FileTools.upload(
          'full_',
          '/user/'+user.profile.id+'/profile-images/full_'+user.profile.id,
          done
        );
      });
      Meteor._powerQ.add(function(done) {
      var largeUrlRaw = 'user/'+user.profile.id+
        '/profile-images/full_'+user.profile.id+_ext;
      var thumbUrlRaw = 'user/'+user.profile.id+
        '/profile-images/thumb_'+user.profile.id+_ext;
      var thumbSigned = FileTools.signedGet(thumbUrlRaw);
      var largeSigned = FileTools.signedGet(largeUrlRaw);
    user.profile.photoUrl = {
        large: largeSigned,
        thumb: thumbSigned
    };
    Meteor.users.update(
      user._id,
      { "$set": { "profile.photoUrl": user.profile.photoUrl }}
    );
    done();
    });
    Meteor._powerQ.resume();
  },
  signProfilePictureUpload: function (fileName, mimeType) {
    check(fileName, String);
    check(mimeType, String);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');

    var filePath = Folder.profilePicture(user.profile.id) + '/newUpload.' +
      FileTools.ext(fileName);
    return FileTools.signUpload(filePath, 'public-read', mimeType);
  },
  deleteFilesFromS3: function(key) {
    check(key, String);
    FileTools.delete(key, function(error,data) {
      if (error)
        return ('File could not be deleted');
      else
        return (null, data);
    });
  }
});
