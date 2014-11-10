Folder = {};

Folder.profilePicture = function (companyName, userId) {
  return companyName + '/profile/picture/' + userId;
};

Folder.companyDocument = function (companyName) {
  return companyName + '/documents/company';
};

Folder.userDocument = function (companyName, userId) {
  return companyName + '/documents/' + userId;
};