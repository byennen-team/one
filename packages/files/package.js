Package.describe({
  summary: 'File storage -- currently on S3.'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use(['aldeed:simple-schema'], both);
  api.use([
    'cfs:reactive-list@0.0.9',
    'cfs:power-queue@0.9.11',
    'aws-sdk',
    'settings'
  ], 'server');

  api.addFiles([
    'file_access.js',
    'shared_with_rule.js',
    'files.js',
    'folder.js'
  ], both);
  api.addFiles(['files_server.js', 'file_resize_server.js'], 'server');
  api.addFiles(['img/thumb_NIA.jpg', 'img/full_NIA.jpg'], 'server');
  api.addFiles('files_client.js', 'web');

  api.export([
    'FileAccess',
    'SharedWithRule',
    'Files',
    'FileTools',
    'Folder'
  ], both);
});

Npm.depends({
  "imagemagick": "0.1.3",
  "gm": "1.16.0",
  "knox": "0.9.1",
  "tmp": "0.0.24",
  "request": "2.51.0",
  "node-fs": "0.1.7",
  // "crypto": "0.0.3",
  "path": "0.11.14"
});
