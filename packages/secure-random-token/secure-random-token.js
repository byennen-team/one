/* globals SecureRandomToken: true */

var crypto = Npm.require('crypto');
var randomBytes = Meteor.wrapAsync(crypto.randomBytes, crypto);

SecureRandomToken = {
  generate: function() {
    var buffer = randomBytes(48);

    return buffer.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
  }
};
