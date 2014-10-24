Package.describe({
  summary: 'Company Apps.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['apps.html', 'apps_client.js', 'apps.less'], 'web');
});
