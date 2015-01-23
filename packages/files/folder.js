/* global Folder: true */

Folder = {};

Folder.companyDocument = function (companyName) {
  return 'company/' + companyName + '/documents';
};

Folder.profilePicture = function (userId) {
  return 'user/' + userId;
};

Folder.galleryPicture = function (userId) {
  return 'user/' + userId + '/galleries';
};

Folder.coverPicture = function (userId) {
  return 'user/' + userId + '/covers';
};

Folder.userDocument = function (userId) {
  return 'user/' + userId + '/documents';
};
