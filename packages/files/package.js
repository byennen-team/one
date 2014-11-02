Package.describe({
  summary: 'File storage -- currently on S3.'
});

Package.onUse(function (api) {
  api.use('aws-sdk', 'server');

  api.addFiles(['files.js', 'folder.js'], ['web', 'server']);
  api.addFiles('files_server.js', 'server');

  api.export(['Files', 'Folder'], ['web', 'server']);
});