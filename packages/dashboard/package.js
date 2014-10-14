Package.describe({
  summary: 'Dashboard templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['dashboard.html', 'dashboard.js', 'dashboard.less'], 'web');
});
