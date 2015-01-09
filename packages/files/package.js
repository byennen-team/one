Package.describe({
  summary: 'File storage -- currently on S3.'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use('aldeed:simple-schema', both);
 
  api.use(['aws-sdk', 'npm-container'], 'server');

  api.addFiles(['files.js', 'folder.js'], both);
  api.addFiles(['files_server.js', 'file_resize_server.js'], 'server');
  api.addFiles('files_client.js', 'web');
  
  api.export(['Files', 'FileTools', 'Folder'], both);
});