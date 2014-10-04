Package.describe({
  summary: 'Dashboard templates.'
});

Package.onUse(function (api) {
  api.use([
    'less', 'templating', 'underscore',
    'jonperl:paper'
  ], 'web');

  api.addFiles(['dashboard.html', 'dashboard.js', 'dashboard.less'], 'web');
});