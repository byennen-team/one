var
fs           = Npm.require('fs'), // for writing local (temp) files
intimidate   = Npm.require('intimidate'),
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
  bucket: Meteor.settings.AWS_BUCKET_RAW,
  maxRetries: 7
};

var s3Client = new intimidate(s3Params);

// set base for modulus in staging and beta enviroment
if(Settings.isStaging || Settings.isBeta) {
  var base = process.env.TEMP_DIR+'/';
} else {
  var base = process.env.PWD+'/packages/files/img/';
}
FileTools.cleanupTemp =  function() {
   fs.readdir(base, function (err, results) {
      var keepImg = ['No_image_available.jpg','full_NIA.jpg','thumb_NIA.jpg'];
      if (err) throw new Meteor.Error(err);
      console.log('results', results);
      if (_.isArray(results)) {
        results.forEach(function(img) {
          if (!_.contains(keepImg, img)) {
            console.log('unlink', img);
            fs.unlink(base+img, function (error) {
            if (error) { console.log('error', error); }
            return;
            });
          }
        });
      }
    });
};
//fetch temp image

FileTools.fetchToTemp = function(url, callback){
  flag404 = false;
  var originalName = url.substring(url.lastIndexOf('/')+1);
  var xpat = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  imgExt = originalName.match(xpat)[0];
  var writable = fs.createWriteStream(base+imgTmp+imgExt, {internal :  true})
  .on('finish', Meteor.bindEnvironment(function(err) {
    if (err) throw new Meteor.Error(err);
    callback();
    }));
  request(url)
  .on('response',
      Meteor.bindEnvironment(function(response){
        response = response || { statusCode: 8888 };
        if (response && response.statusCode === 404) {
            flag404 = true;
            }})
      )
  .on('end',
     Meteor.bindEnvironment(function(error, response){
     if (error) console.log('end error', response.statusCode, '\n url: ', url);
       }))
  .pipe(writable);
};

//resize
FileTools.resizeTemp = function(size, callback) {
    if (flag404) { return callback(); }
    Meteor.wrapAsync(im.identify(base+imgTmp+imgExt, Meteor.bindEnvironment(
    function(err, features) {
      var scalingFactor = Math.max(
        resizeWidths[size] / features.width,
        resizeHeights[size] / features.height
        );
      var width = scalingFactor * features.width;
      var height = scalingFactor * features.height;
      im.resize({
        srcPath: base+imgTmp+imgExt,
        dstPath: base+size+imgTmp+imgExt,
        width:  width,
        height: height,
        quality: 0.6
        }, Meteor.bindEnvironment(function(err) {
          if (err) {
            console.log('resized error: ', err);
          }
          callback();
         })
        );
     })
    ));
};

//upload
FileTools.upload = function (descriptor, remotefile, callback) {
  var imagefile = base+descriptor+imgTmp+imgExt;
  remotefile+=imgExt;
  if (flag404) {
    imagefile = base+'No_image_available.jpg';
  }
  var putFileCallback = Meteor.bindEnvironment(function(err, response) {
    if (err) { console.log('upload error:', remotefile); }
    if (200 === response.statusCode) {
      callback();
    } else {
      console.log('??? : ', remotefile, ' : code : ', response.statusCode);
    }
  });
  Meteor.wrapAsync(s3Client.upload(imagefile, remotefile, putFileCallback));
};

// always clean up temporary files
tmp.setGracefulCleanup();
