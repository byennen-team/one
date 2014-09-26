Package.describe({
  summary: 'Not found templates.'
});

Package.onUse(function (api) {
  api.use('templating', 'web');

  api.addFiles('not_found.html', 'web');
});