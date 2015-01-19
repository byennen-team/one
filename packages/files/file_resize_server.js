var
fs           = Npm.require('fs'), // for writing local (temp) files
knox         = Npm.require('knox'),
crypto       = Npm.require('crypto'), // used to create hash of image
path         = Npm.require('path'),  // used for getting file extension
request      = Npm.require('request'), // fetchin remote image data
tmp          = Npm.require('tmp'), // creates temporary directory
tmpath,
im           = Npm.require('imagemagick'), // re-size images
gm           = Npm.require('gm').subClass({ imageMagick: true }), // graphics magic
encoding     = 'binary', // default encoding
resizeWidths = { "mobile_":480, "thumb_":65, "full_":140 },
resizeHeights = { "mobile_": 480, "thumb_": 65, "full_": 140 },
img_tmp = 'imagetmp',
img_ext = '.jpeg',
imageremote = 'remoteimage.jpeg',
flag404 = false,
s3_params = {
  key: Meteor.settings.AWS_ACCESS_KEY_ID, //<api-key-here>'
  secret: Meteor.settings.AWS_SECRET_ACCESS_KEY,  //'<secret-here>'
  bucket: Meteor.settings.AWS_BUCKET
},
s3_client = knox.createClient(s3_params);

// set base for modulus in staging and beta enviroment
if(Settings.isStaging || Settings.isBeta) {
  var base = process.env.TEMP_DIR+'/';
} else {
  var base = process.env.PWD+'/tmp/';
}

//fetch temp image
FileTools.fetch_to_temp = function(url, callback){
  flag404 = false;
  var originalName = url.substring(url.lastIndexOf('/')+1);
  var xpat = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  img_ext = originalName.match(xpat)[0];
  request(url)
  .on('response',
      Meteor.bindEnvironment(function(response){
        response = response || { statusCode: 8888 };
        if (response && response.statusCode == 404) {
            console.log(url, ' not found', response.statusCode);
            console.log('base', base);
            flag404 = true;
            callback();
            }})
      )
  .on('end',
      Meteor.bindEnvironment(function(error, response, body){
        if (error) console.log('end error', response.statusCode);
        callback();
       }))
  .pipe(fs.createWriteStream(base+img_tmp+img_ext, {internal :  true}));
};

//resize
FileTools.resize_temp = function(size, callback) {
    if (flag404) { return callback(); }
    Meteor.wrapAsync(im.resize({
      srcPath: base+img_tmp+img_ext,
      dstPath: base+size+img_tmp+img_ext,
      width:  resizeWidths[size],
      height: resizeHeights[size],
      quality: 0.6
    }, Meteor.bindEnvironment(function(err, stdout, stderr){
      if (err) {
        console.log('resized error: ', err);
      }
      callback();
    })));
};

//upload
FileTools.upload = function (descriptor, remotefile, callback) {
  var imagefile = base+descriptor+img_tmp+img_ext;
  remotefile+=img_ext;
  if (flag404) {
      imagefile = base+descriptor+'NIA.jpg';
      console.log('remote:', remotefile, '  : ', imagefile);
  }
  Meteor.wrapAsync(s3_client.putFile(imagefile, remotefile, Meteor.bindEnvironment(function(err, response) {
      if (err) { console.log('upload error:', remotefile); }
      callback();
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
