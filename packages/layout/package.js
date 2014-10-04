Package.describe({
  summary: 'Layout templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'authorization'], 'web');

  api.addFiles([
    '_footer.html', '_header.html', '_left_nav.html',
    'application.html', 'application.js', 'application.css',
    'left_nav.js'
  ], 'web');
});
