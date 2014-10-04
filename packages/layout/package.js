Package.describe({
  summary: 'Layout templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'authorization'], 'web');

  api.addFiles([
    'application/_footer.html',
    'application/_header.html',
    'application/_left_nav.html', 'application/left_nav.js',
    'application/application.html', 'application/application.js', 'application/application.css',
    'login/login.html'
  ], 'web');
});
