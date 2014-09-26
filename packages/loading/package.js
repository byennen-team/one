Package.describe({
  summary: 'Loading templates.'
});

Package.onUse(function (api) {
  api.use('templating', 'web');

  api.addFiles('loading.html', 'web');
});