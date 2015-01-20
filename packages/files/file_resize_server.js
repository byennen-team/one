var
fs           = Npm.require('fs'), // for writing local (temp) files
knox         = Npm.require('knox'),
request      = Npm.require('request'), // fetchin remote image data
tmp          = Npm.require('tmp'), // creates temporary directory
im           = Npm.require('imagemagick'), // re-size images
resizeWidths = { "mobile_":480, "thumb_":65, "full_":140 },
resizeHeights = { "mobile_": 480, "thumb_": 65, "full_": 140 },
imgTmp = 'imagetmp',
imgExt = '.jpeg',
flag404 = false,
s3Params = {
  key: Meteor.settings.AWS_ACCESS_KEY_ID, //<api-key-here>'
  secret: Meteor.settings.AWS_SECRET_ACCESS_KEY,  //'<secret-here>'
  bucket: Meteor.settings.AWS_BUCKET
},
s3Client = knox.createClient(s3Params);

// set base for modulus in staging and beta enviroment
if(Settings.isStaging || Settings.isBeta) {
  var base = process.env.TEMP_DIR+'/';
} else {
  var base = process.env.PWD+'/packages/files/img/';
}

//fetch temp image
FileTools.fetchToTemp = function(url, callback){
  flag404 = false;
  var originalName = url.substring(url.lastIndexOf('/')+1);
  var xpat = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  imgExt = originalName.match(xpat)[0];
  request(url)
  .on('response',
      Meteor.bindEnvironment(function(response){
        response = response || { statusCode: 8888 };
        if (response && response.statusCode === 404) {
            console.log(url, ' not found', response.statusCode);
            console.log('base', base);
            flag404 = true;
            callback();
            }})
      )
  .on('end',
      Meteor.bindEnvironment(function(error, response){
        if (error) console.log('end error', response.statusCode);
        callback();
       }))
  .pipe(fs.createWriteStream(base+imgTmp+imgExt, {internal :  true}));
};

//resize
FileTools.resizeTemp = function(size, callback) {
    if (flag404) { return callback(); }
    Meteor.wrapAsync(im.resize({
      srcPath: base+imgTmp+imgExt,
      dstPath: base+size+imgTmp+imgExt,
      width:  resizeWidths[size],
      height: resizeHeights[size],
      quality: 0.6
    }, Meteor.bindEnvironment(function(err) {
      if (err) {
        console.log('resized error: ', err);
      }
      callback();
    })));
};

//upload
FileTools.upload = function (descriptor, remotefile, callback) {
  var imagefile = base+descriptor+imgTmp+imgExt;
  remotefile+=imgExt;
  if (flag404) {
    imagefile = base+descriptor+'NIA.jpg';
    console.log('remote:', remotefile, '  : ', imagefile);
  }
  var putFileCallback = Meteor.bindEnvironment(function(err) {
    if (err) { console.log('upload error:', remotefile); }
    callback();
  });
  Meteor.wrapAsync(s3Client.putFile(imagefile, remotefile, putFileCallback));
};

// always clean up temporary files
tmp.setGracefulCleanup();
