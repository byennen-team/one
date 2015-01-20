Package.describe({
  summary: 'One Directory'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'one-search'], 'web');

  api.addFiles(['directory.html', 'directory.less', 'directory.js'], 'web');
});
