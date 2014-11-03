Package.describe({
  summary: 'One Search'
});

//Question: If I include user-elliman package should I be able to find the user?
Package.onUse(function (api) {
  api.use(['less', 'session', 'templating'], 'web');

  api.addFiles(['search.js', 'search.html', 'search.less', 'search_client.js'], 'web');

  api.addFiles('search_server.js', 'server');

  api.export('Search', 'web')
});