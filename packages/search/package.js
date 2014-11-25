Package.describe({
  summary: 'One Search'
});

//Question: If I include user-elliman package should I be able to find the user?
Package.onUse(function (api) {
  var both = ['web', 'server'];
  api.use([
    'less', 'reactive-var', 'session',
    'templating', 'tracker', 'routes',
    'stevezhu:velocity.js@0.1.0'
  ], 'web');

  api.addFiles('search.js', both);
  api.addFiles(['search.html', 'search.less', 'search_client.js'], 'web');
  api.addFiles('search_server.js', 'server');

  api.export('Search', 'web')
});
