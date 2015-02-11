Package.describe({
  summary: 'Loading templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');

  api.addFiles(['loading.html', 'loading.less', 'loading.gif'], 'web');
});
