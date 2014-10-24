Package.describe({
  summary: 'One Support'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['support.html', 'support_client.js', 'support.less'], 'web');
});
