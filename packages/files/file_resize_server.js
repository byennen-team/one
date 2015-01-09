var
fs           = Npm.require('node-fs'),             // for writing local (temp) files
knox         = Npm.require('knox'),
crypto       = Npm.require('crypto'),         // used to create hash of image
path         = Npm.require('path'),           // used for getting file extension
request      = Npm.require('request'),        // fetchin remote image data
tmp          = Npm.require('tmp'),         // creates temporary directory
tmpath,
im           = Npm.require('imagemagick'), // re-size images
gm           = Npm.require('gm').subClass({ imageMagick: true }), // graphics magic
encoding     = 'binary',                      // default encoding
oi           = {},                            // original image
resizeWidths = { "mobile_":480, "thumb_":65, "full_":140 },
resizeHeights = { "mobile_": 480, "thumb_": 65, "full_": 140 };

var base = process.env.PWD+'/tempImages/';
var img_tmp = 'imagetmp';
var img_ext = '.jpeg';
var temp_img_file = base+img_tmp+img_ext;
var imageremote = 'remoteimage.jpeg';
var s3_params = {
    key: Meteor.settings.AWS_ACCESS_KEY_ID //<api-key-here>'
  , secret: Meteor.settings.AWS_SECRET_ACCESS_KEY  //'<secret-here>'
  , bucket: Meteor.settings.AWS_BUCKET
  , region: Meteor.settings.AWS_REGION
};
console.log('s3_params', s3_params);
var s3_client = knox.createClient(s3_params);
FileTools.fetch_to_temp = function(url, done){
  var originalName = url.substring(url.lastIndexOf('/')+1);
  var xpat = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  img_ext = originalName.match(xpat)[0];
  request(url)
  .on('response', 
      Meteor.bindEnvironment(function(response){
        response = response || { statusCode: 8888 };
        if (response && response.statusCode == 404) {
           console.log(url, ' not found', response.statusCode);
           fs.createReadStream(base+'No_image_available.jpg')
           .pipe(fs.createWriteStream(base+img_tmp+img_ext))
           .on('end', Meteor.bindEnvironment(function(err, res) {
            if (err) throw err;
            console.log('piped No Image Available');
            done();
            }));
         } 
       }))
  .on('end', 
      Meteor.bindEnvironment(function(error, response, body){
        if (error) console.log('end error', response.statusCode);
        done();
       })) 
  .pipe(fs.createWriteStream(base+img_tmp+img_ext)); 
};
FileTools.resize_temp = function(size, done) {
  Meteor.wrapAsync(im.resize({
      srcPath: base+img_tmp+img_ext,
      dstPath: base+size+img_tmp+img_ext,
      width:   resizeWidths[size],
      height: resizeHeights[size],
      quality: 0.6
    }, Meteor.bindEnvironment(function(err, stdout, stderr){
      if (err) {
        console.log('resized error: ');
FileTools.upload = function (descriptor, remotefile, done) {
  var imagefile = base+descriptor+img_tmp+img_ext;
  remotefile+=img_ext;
  Meteor.wrapAsync(s3_client.putFile(imagefile, remotefile, Meteor.bindEnvironment(function(err, response) {
      if (err) { console.log('upload error:', remotefile); }
      done();
    })));               
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
