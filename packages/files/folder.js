Folder = {};

Folder.companyDocument = function (companyName) {
  return 'company/' + companyName + '/documents';
};

Folder.profilePicture = function (userId) {
  return 'user/' + userId;
};

Folder.userDocument = function (userId) {
  return 'user/' + userId + '/documents';
};