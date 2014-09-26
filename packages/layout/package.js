Package.describe({
  summary: 'Layout templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'authorization'], 'web');

  api.addFiles([
    '_footer.html', '_header.html',
    'application.html', 'application.js'
  ], 'web');
});