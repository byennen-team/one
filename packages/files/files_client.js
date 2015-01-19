FileTools.upload = function (method, file, options) {
  options = options || {};
  var noop = function () {};
  _.defaults(options, {
    onProgress: undefined,
    onError: noop,
    onComplete: noop,
    parentFolderId: null
  });

  var args = [file.name, file.type];
  if (options.parentFolderId) {
    args.push(options.parentFolderId);
  }

  // Heavily borrowed from http://stackoverflow.com/a/12378395/230462
  Meteor.apply(method, args, function (error, result) {
    if (error) {
      options.onError(error);
      return;
    }
    var formData = new FormData();
    var key = 'events/' + (new Date()).getTime() + '-' + file.name;

    formData.append('key', result.filePath);
    formData.append('acl', result.acl);
    formData.append('Content-Type', file.type);
    formData.append('AWSAccessKeyId', result.credentials.accessKey);
    formData.append('policy', result.credentials.policy);
    formData.append('signature', result.credentials.signature);

    formData.append('file', file);

    var xhr = new XMLHttpRequest();
    if (options.onProgress)
      xhr.upload.addEventListener('progress', options.onProgress, false);

    //onComplete &&
    xhr.addEventListener('load', function () {
     options.onComplete(result);
    }, false);

    xhr.addEventListener('error', options.onError, false);
    xhr.addEventListener('abort', options.onError, false);

    xhr.open('POST', Meteor.settings.public.AWS_BUCKET_URL, true);
    xhr.send(formData);
  });
};

FileTools.deleteStub = function (method, filePath, callback) {
  Meteor.call(method, filePath, function (error, result) {
    if (error) return;

    if (callback)
      callback(null, result);
  });
};

FileTools.createFolder = function (folderName, parentFolderId, isCompanyDocument, callback) {
  return Meteor.call('createFolder', folderName, parentFolderId, isCompanyDocument, callback);
};

FileTools.isCompanyDocumentsActive = function () {
  var currentFolder = Files.findOne(Session.get('currentFolderId'));
  return currentFolder ?
    currentFolder.companyDocument :
    Routes.getName() === Routes.COMPANY_DOCUMENTS;
};

FileTools.isMyDocumentsActive = function () {
  var currentFolder = Files.findOne(Session.get('currentFolderId'));
  return currentFolder ?
    !currentFolder.companyDocument :
    Routes.getName() === Routes.MY_DOCUMENTS;
};
