Package.describe({
  summary: 'One Directory'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['directory.html', 'directory.less', 'directory_client.js'], 'web');
  api.addFiles('directory_server.js', 'server');
});
