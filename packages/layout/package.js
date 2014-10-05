Package.describe({
  summary: 'Layout templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'authorization', 'left-nav'], 'web');

  api.addFiles([
    'application/_footer.html',
    'application/_header.html',
    'application/application.html', 'application/application.js', 'application/application.css',
    'login/login.html'
  ], 'web');
});
