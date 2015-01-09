var
fs           = Npm.require('fs'),             // for writing local (temp) files
crypto       = Npm.require('crypto'),         // used to create hash of image
path         = Npm.require('path'),           // used for getting file extension
request      = Meteor.npmRequire('request'),        // fetchin remote image data
tmp          = Meteor.npmRequire('tmp'),         // creates temporary directory
tmpath,
im           = Meteor.npmRequire('imagemagick'), // re-size images
gm           = Meteor.npmRequire('gm').subClass({ imageMagick: true }), // graphics magic
encoding     = 'binary',                      // default encoding
oi           = {},                            // original image
resizeWidths = { "mobile_":480, "thumb_":200, "full_":1200 },
base = process.env.PWD
var imagetmp = 'imagetmp.jpeg'
var imageremote = 'remoteimage.jpeg'
FileTools.fetch_resize_and_upload = function(url) {
        console.log('fetch_resize_and_upload', url);
        var imageFile = base+'/'+imagetmp;
        request(url).on('end', function(error, response, body){
          console.log('response end');
          resize_and_upload(imageFile);
        }).pipe(fs.createWriteStream(imageFile))    
}
var resize_and_upload = function(imageFile) {
  console.log('resize_and_upload: ', imageFile);
    Meteor.wrapAsync(im.resize({
      srcPath: base+'/'+imageFile,
      dstPath: base+'/full_'+imageFile,
      width:   resizeWidths['full_'],
      quality: 0.6
    }))
    Meteor.wrapAsync(im.resize({
        srcPath: base+'/'+imageFile,
        dstPath: base+'/mobile_'+imageFile,
        width:   resizeWidths['mobile_'],
        quality: 0.6
      }))
    Meteor.wrapAsync(im.resize({
          srcPath: base+'/'+imageFile,
          dstPath: base+'/thumb_'+imageFile,
          width:   resizeWidths['thumb_'],
          quality: 0.6
        }))
    uploadAll(base+'/'+imageFile, imageremote)
  
}

var uploadAll = function(tempfile, remotefilename) {
  console.log('upload all')
  uploadToS3('mobile_'+tempfile, 'mobile_'+remotefilename)
  uploadToS3('thumb_'+tempfile, 'thumb_'+remotefilename)
  uploadToS3('full_'+ tempfile, 'full_'+remotefilename)
}
var uploadBucket = new AWS.S3()
var uploadToS3 = function uploadToS3(localfile, remotefilename){
    var signedFile = FileTools.signUpload(localfile, 'private', 'image/jpeg')
    console.log('signed-remoteFile', signedFile.signature);
    var stream = fs.createReadStream(localfile)
    var _bucket = new AWS.S3({Bucket: 'chuckgooneapp'})
    _bucket.upload({Key: signedFile.signature, Body: stream })
    .on('httpUploadProgress', function(evt) { console.log(evt); })
    .send(function(err, data) { console.log(err, data)});
    console.log('finit')
   
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
