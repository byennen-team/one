/* global Folder: true */

Folder = {};

Folder.companyDocument = function (companyName) {
  return 'company/' + companyName + '/documents';
};

Folder.profilePicture = function (userId) {
  return 'user/' + userId +'/profile';
};

Folder.galleryPicture = function (userId, gallery) {
  var g = gallery || 'uploads';
  return 'user/' + userId + '/'+ g;
};

Folder.coverPicture = function (userId) {
  return 'user/' + userId + '/covers';
};

Folder.userDocument = function (userId) {
  return 'user/' + userId + '/documents';
};
