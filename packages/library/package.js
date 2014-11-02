Package.describe({
  name: 'library',
  summary: 'One Library for document storage.'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use('lepozepo:s3', both);
  api.addFiles('s3.js', 'server');

  api.use(['templating', 'less'], 'web');
  api.addFiles(['library.html', 'library.js', 'library.less', 'documentUploader.html', 'documentUploader.js'], 'web');
});
