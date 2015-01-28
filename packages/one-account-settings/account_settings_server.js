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
  s3Signature: function (fileName, mimeType, gallery, bucket) {
    check(fileName, String);
    check(mimeType, String);
    if (gallery) {
      check(gallery, String);
    } else {
      gallery = 'uploads'
    };
    if (bucket) {
      check(bucket, String);
    } else {
      bucket = Meteor.settings.public.UPLOAD_BUCKET;
    }
    var resizedBucket = 'goone-resized-west-2';

    console.log('s3Signature \n', fileName, '\n mimeType ', mimeType,
    '\n gallery ', gallery );

    var user = Meteor.user();

    if(!user) throw new Meteor.Error('Must login to upload.');

    var path = 'user/'+ user.profile.id + '/'+ gallery + '/'+ fileName;

    var _upload = FileTools.signUpload(path, 'public-read', mimeType, bucket);
    var _thumbUrl = FileTools.signedGet('/thumb/'+path, resizedBucket);
    var _fullUrl = FileTools.signedGet('/full/'+path, resizedBucket);
    _upload.thumbUrl = _thumbUrl;
    _upload.fullUrl = _fullUrl;
    return _upload;
  },
  signProfilePictureUpload: function (fileName, mimeType, filePath) {
    console.log('signProfilePictureUpload', fileName,
    ' mimeType ', mimeType, ' filePath ', filePath );
    check(fileName, String);
    check(mimeType, String);
    if (filePath)
      check(filePath, String);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');

    var pathToFile;

    if (filePath)
      pathToFile = Folder.galleryPicture(user.profile.id) +
        '/' + filePath + '.' + FileTools.ext(fileName);
    else
      pathToFile = Folder.profilePicture(user.profile.id) + '/' + fileName;

    //Andreas: to discuss: does my modification from newUpload to Random.id()
    //impact the code in any way? // Chuck: previously I used the static
    //'newUpload' as an easy handle for the resize log. The AWS code we now use
    //transform-pipes from raw-upload bucket to resized bucket.

    var bucket = Meteor.settings.public.AWS_BUCKET_RAW;
    return FileTools.signUpload(pathToFile, 'public-read', mimeType, bucket);
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
