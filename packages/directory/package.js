Package.describe({
  summary: 'One Directory'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'search'], 'web');

  api.addFiles(['directory.html', 'directory.less', 'directory_client.js'], 'web');
});