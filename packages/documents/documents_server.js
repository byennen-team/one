Meteor.methods({
  signCompanyFileUpload: function (fileName, mimeType) {
    check(fileName, String);
    check(mimeType, String);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');

    // TODO grab company name
    var companyName = 'elliman';

    var filePath = Folder.companyDocument(companyName) + '/' + fileName;

    Files.insert({companyDocument: true, name: fileName, uploadDate: new Date(), userId: user._id});

    return FileTools.signUpload(filePath, mimeType);
  },
  signUserFileUpload: function (fileName, mimeType) {
    check(fileName, String);
    check(mimeType, String);

    var user = Meteor.user();
    if (!user) throw new Meteor.Error('Invalid credentials');

    // TODO grab company name
    var companyName = 'elliman';

    var filePath = Folder.userDocument(companyName, user._id) + '/' + fileName;

    Files.insert({companyDocument: false, name: fileName, uploadDate: new Date(), userId: user._id});

    return FileTools.signUpload(filePath, mimeType);
  }
});