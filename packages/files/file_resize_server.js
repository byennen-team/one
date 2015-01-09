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

FileTools.fetch_resize_and_upload = function (fileUrl, next) {
  fetchImage(fileUrl, 
            resize_mobile_thumb_full(base+'fetchTemp',
                                     uploadAll(base+'/fetchTemp', 'remote', next)
                                    )
            )
};
var fetchImage = function fetchImage(url, next) {
      var req = http.get(url, function(resp) {
        var buf = new Buffer("", "binary");
        resp.on('data', function(chunk) {
          buf = Buffer.concat([buf, chunk]);
        });
        resp.on('end', function() {
          fs.writeFile(base+'/fetchTemp', buf, next)
        });
    });
}

var resize_mobile_thumb_full = function(imagefile, next){
          resizeImage(imagefile, 'mobile_',
                      resizeImage( imagefile, 'thumb_',
                                  resizeImage( imagefile, 'full_',
                                              next)));
};

var resizeImage = function resizeImage(imageFile, prefix, next) {
  var resizedFilePath = prefix+imageFile;
  im.resize({
    srcPath: imageFile,
    dstPath: resizedFilePath,
    width:   resizeWidths[prefix],
    quality: 0.6
  }, function(err, stdout, stderr){
    if (err) throw err;
    uploadToS3(resizedFilePath, prefix+filename); // upload mobile version to S3
  });
}
var uploadAll = function(tempfile, remotefilename, next) {
  uploadToS3('mobile_'+tempfile, 'mobile_'+remotefilename)
  uploadToS3('thumb_'+tempfile, 'thumb_'+remotefilename)
  uploadToS3('full_'+ tempfile, 'full_'+remotefilename)
  next
}
var uploadToS3 = function uploadToS3(localfile, remotefilename){
    var signedFile = FileTools.signUpload(localfile, 'private', 'image/jpeg')
    console.log('signedFile', signedFile);
    console.log('remoteFile', remotefilename);
    FileTools.upload_from_server(signedFile.filepath, remotefilename,
                                 signedFile.acl, function(err, res){
      if (err) { throw err;  } else {
        // console.log(">>> S3 : "+s3baseurl+"full_"+filename);
        res.resume();
      }
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
