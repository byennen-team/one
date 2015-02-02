Meteor.methods({
  /**
   * Create a signature to upload the current user's profile picture to s3.
   */
  s3Signature: function (fileName, mimeType, gallery, bucket) {
    check(fileName, String);
    check(mimeType, String);
    gallery = gallery || 'uploads';
    check(gallery, String);
    bucket = bucket || Meteor.settings.public.UPLOAD_BUCKET;
    check(bucket, String);

    var resizedBucket = Meteor.settings.AWS_BUCKET_RESIZED;

    console.log('s3Signature \n', fileName, '\n mimeType ', mimeType,
    '\n gallery ', gallery );

    var user = Meteor.user();

    if(!user) throw new Meteor.Error('Must login to upload.');

    var path = 'user/' + user.profile.id + '/'+ gallery + '/'+ fileName;

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
