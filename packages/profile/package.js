Package.describe({
  summary: 'Profile templates.'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use('lepozepo:s3', both);
  api.addFiles('s3.js', 'server');

  api.use(['templating', 'joshowens:simple-form'], 'web');
  api.addFiles(['profileEdit.html', 'profileEdit.js', 'profileUploader.html', 'profileUploader.js'], 'web');
});
