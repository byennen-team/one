Package.describe({
  summary: 'Layout templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'authorization', 'left-nav', 'less', 'styles'], 'web');
  api.addFiles(['application.html', 'application_client.js'], 'web');
});
