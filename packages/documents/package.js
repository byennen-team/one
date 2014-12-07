Package.describe({
  summary: 'One Documents'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use(['less', 'jquery', 'session', 'templating', 'mrt:moment'], 'web');
  api.use('files', both);

  api.addFiles([
    'documents.html', 'documents_client.js', 'documents.less',
    'documents_widget.html'
  ], 'web');

  api.addFiles('documents_server.js', 'server');
});
