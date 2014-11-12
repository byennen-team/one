Package.describe({
  summary: 'Favorite Documents'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];
  
  api.use('files', both);
  api.use(['templating', 'less', 'mrt:moment'], 'web');

  api.addFiles([
    'favorite_documents.html', 'favorite_documents.js', 'favorite_documents.less',
  ], 'web');
});
