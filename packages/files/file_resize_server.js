var
fs           = Npm.require('node-fs'),             // for writing local (temp) files
crypto       = Npm.require('crypto'),         // used to create hash of image
path         = Npm.require('path'),           // used for getting file extension
request      = Npm.require('request'),        // fetchin remote image data
tmp          = Npm.require('tmp'),         // creates temporary directory
tmpath,
im           = Npm.require('imagemagick'), // re-size images
gm           = Npm.require('gm').subClass({ imageMagick: true }), // graphics magic
encoding     = 'binary',                      // default encoding
oi           = {},                            // original image
resizeWidths = { "mobile_":480, "thumb_":200, "full_":1200 },
base = process.env.PWD
var imagetmp = 'imagetmp.jpeg'
var imageremote = 'remoteimage.jpeg'
FileTools.fetch_resize_and_upload = function(url, id, next) {
        console.log('fetch_resize_and_upload', url);
        var originalName = url.substring(url.lastIndexOf('/')+1)
        var imageFile = base+'/'+imagetmp;
        request(url).on('end', function(error, response, body){
          console.log('response end');
          resize_and_upload(imagetmp, originalName, id, next);
        }).pipe(fs.createWriteStream(imageFile))
}
var resize_and_upload = function(imageFile, originalName, id, next) {
    console.log('resize_and_upload: ', imageFile, originalName, id);
    var remoteFolder = id+'/'
    var remotefilename = originalName;
    Meteor.wrapAsync(im.resize({
      srcPath: base+'/'+imageFile,
      dstPath: base+'/full_'+imageFile,
      width:   resizeWidths['full_'],
      quality: 0.6
    }))
    uploadToS3(base+'/full_'+ imageFile, remoteFolder+'full_'+remotefilename)
    Meteor.wrapAsync(im.resize({
        srcPath: base+'/'+imageFile,
        dstPath: base+'/mobile_'+imageFile,
        width:   resizeWidths['mobile_'],
        quality: 0.6
      }))
    uploadToS3(base+'/mobile_'+imageFile, remoteFolder+'mobile_'+remotefilename)
    Meteor.wrapAsync(im.resize({
          srcPath: base+'/'+imageFile,
          dstPath: base+'/thumb_'+imageFile,
          width:   resizeWidths['thumb_'],
          quality: 0.6
        }))
    uploadToS3(base+'/thumb_'+imageFile, remoteFolder+'thumb_'+remotefilename)
    return next
}

var uploadBucket = new AWS.S3()
var uploadToS3 = function uploadToS3(localfile, remotefilename){
    //var signedFile = FileTools.signUpload(localfile, 'private', 'image/jpeg')
    //console.log('signed-remoteFile', signedFile.credentials.signature);
    var stream = fs.createReadStream(localfile)
    uploadBucket.createBucket(function() {
      var params = { Bucket: Meteor.settings.AWS_BUCKET, Key: remotefilename, Body: stream };
      uploadBucket.putObject(params, function(err, data) {
        if (err) {
          console.log("Error uploading data: ", err);
        } else {
          console.log("Successfully uploaded data: ", params.Key);
        }
      });
    console.log('finit', localfile, remotefilename)
    });
};

// creates an object with various urls to be sent back to client
function imagesObject(filename){
  // a hash containing all the links to images
  var images = {
    full:   s3baseurl+"full_"+filename,
    mobile: s3baseurl+"mobile_"+filename,
    thumb:  s3baseurl+"thumb_"+filename
  };
  return images;
}

// always clean up temporary files
tmp.setGracefulCleanup();
