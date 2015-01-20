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
        FileTools.fetch_to_temp(newUrl, done);
      });
      Meteor._powerQ.add(function(done) {
        FileTools.resize_temp('thumb_', done);
      });
      Meteor._powerQ.add(function(done){
        FileTools.upload('thumb_', '/user/'+user.profile.id+'/profile-images/thumb_'+user.profile.id, done);
      });
      Meteor._powerQ.add(function(done) {
        FileTools.resize_temp('full_', done);
      });
      Meteor._powerQ.add(function(done){
        FileTools.upload('full_', '/user/'+user.profile.id+'/profile-images/full_'+user.profile.id, done);
      });
      Meteor._powerQ.add(function(done) {
      var large_url_raw = 'user/'+user.profile.id+'/profile-images/full_'+user.profile.id+_ext;
      var thumb_url_raw = 'user/'+user.profile.id+'/profile-images/thumb_'+user.profile.id+_ext;
      var thumb_signed = FileTools.signedGet(thumb_url_raw);
      var large_signed = FileTools.signedGet(large_url_raw);
    user.profile.photoUrl = {
        large: large_signed,
        thumb: thumb_signed
    };
    var update = Meteor.users.update(user._id, { "$set": { "profile.photoUrl": user.profile.photoUrl }});
    done();
    });
    Meteor._powerQ.resume();
  },
  signProfilePictureUpload: function (fileName, mimeType, filePath) {
    check(fileName, String);
    check(mimeType, String);
    if (filePath)
      check(filePath, String);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');


    if (filePath)
      var pathToFile = Folder.galleryPicture(user.profile.id) + '/' + filePath + '.' + FileTools.ext(fileName);
    else
      var pathToFile = Folder.profilePicture(user.profile.id) + '/newUpload.' + FileTools.ext(fileName);

    //Andreas: to discuss: does my modification from newUpload to Random.id() impacts the code in any way?

    return FileTools.signUpload(pathToFile, 'public-read', mimeType);
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
