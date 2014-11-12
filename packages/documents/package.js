
Package.describe({
  summary: 'One Documents'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use(['templating', 'less', 'mrt:moment'], 'web');
  api.use('files', both);

  api.addFiles([
    'documents.html', 'documents.js', 'documents.less',
    'documents_widget.html', 'documents_menu.html'
  ], 'web');

  api.addFiles('documents_server.js', 'server');
});
