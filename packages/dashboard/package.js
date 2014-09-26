Package.describe({
  summary: 'Dashboard templates.'
});

Package.onUse(function (api) {
  api.use('templating', 'web');

  api.addFiles('dashboard.html', 'web');
});