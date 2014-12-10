Package.describe({
  summary: 'Dashboard templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'mrt:moment'], 'web');
  api.addFiles([
    'dashboard.html', 'dashboard_client.js', 'dashboard.less',
    'dashboard_banner.html', 'dashboard_banner_client.js', 'dashboard_banner.less'
    ], 'web');
});
