FileTools.upload = function (method, file, options) {
  options = options || {};
  var bucket = options.bucket || Meteor.settings.public.AWS_DEFAULT_BUCKET;
  console.log('method', method, file, bucket);
  var noop = function () {};
  _.defaults(options, {
    onProgress: undefined,
    onError: noop,
    onComplete: noop,
    parentFolderId: null,
    filePath: null
  });
  var args = [file.name, file.type];
  if (options.parentFolderId) {
    args.push(options.parentFolderId);
  }
  if (options.filePath) {
    args.push(options.filePath);
  }
  Meteor.apply(method, args, function(err, result){
    if (err) {
      options.onError(err);
      return;
    }
    var formData = new FormData();
    console.log('result', result);
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
    var url = Meteor.settings.public.AWS_BUCKETS[bucket].url;
    xhr.addEventListener('error', options.onError, false);
    xhr.addEventListener('abort', options.onError, false);
    xhr.open('POST', url , true);
    xhr.send(formData);
  });
};


FileTools.s3Upload = function (file, gallery, options) {
  options = options || {};
  var noop = function () {};
  _.defaults(options, {
    onProgress: undefined,
    onError: noop,
    onComplete: noop,
    parentFolderId: null,
    filePath: null
  });
  var bucket = Meteor.settings.public.UPLOAD_BUCKET;
  var fileName = file.name;
  var mimeType = file.type;
  console.log('s3Upload', fileName, mimeType, gallery, options);
  var argArray = [fileName, mimeType, gallery, bucket];
  Meteor.apply('s3Signature', argArray, options,
  function(err, result){
    if (err) {
      console.log('error', err);
      options.onError(err);
      return;
    }
    console.log('result', result);
    var formData = new FormData();

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
    var url = Meteor.settings.public.AWS_BUCKETS[bucket].url;
    console.log('bucket url', url);
    xhr.open('POST', url , true);
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

FileTools.createFolder = function (
  folderName,
  parentFolderId,
  isCompanyDocument,
  callback
) {
  return Meteor.call(
    'createFolder',
    folderName,
    parentFolderId,
    isCompanyDocument,
    callback
  );
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
