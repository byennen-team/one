//Files.Signature = {
//  PROFILE_PICTURE: 'signProfilePictureUpload',
//  COMPANY_DOCUMENT: 'some other signing method'
//};

// TODO abstract Profile.uploadPictureFromForm to
//Files.uploadToAws = function(signatur, file, callback, onProgress)

Profile.uploadPictureFromForm = function (file, callback, onProgress) {
  // Heavily borrowed from http://stackoverflow.com/a/12378395/230462
  Meteor.call('signProfilePictureUpload', file.type, Files.ext(file.name), function (error, result) {
    if (error) return;

    var formData = new FormData();
    var key = 'events/' + (new Date).getTime() + '-' + file.name;

    formData.append('key', result.filePath);
    formData.append('acl', 'public-read');
    formData.append('Content-Type', file.type);
    formData.append('AWSAccessKeyId', result.credentials.accessKey);
    formData.append('policy', result.credentials.policy);
    formData.append('signature', result.credentials.signature);

    formData.append('file', file);

    var xhr = new XMLHttpRequest();

    if (onProgress) xhr.upload.addEventListener('progress', onProgress, false);

    xhr.addEventListener('load', function () {
      callback(null, result);
    }, false);

    var onError = function (evt) {
      callback(evt);
    };
    xhr.addEventListener('error', onError, false);
    xhr.addEventListener('abort', onError, false);

    xhr.open('POST', Meteor.settings.public.AWS_BUCKET_URL, true);
    xhr.send(formData);
  });
};