Package.describe({
  summary: 'One Documents'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use(['templating', 'less'], 'web');
  api.use('files', both);

  api.addFiles([
    'favorite_documents.html', 'favorite_documents.js',
    'documents.html', 'documents.js',
    'documents_widget.html', 'documents.less'
  ], 'web');

  api.addFiles('documents_server.js', 'server');
});
