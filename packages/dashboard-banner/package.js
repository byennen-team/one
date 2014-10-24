Package.describe({
  summary: 'One Dashboard Banner'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'mrt:moment'], 'web');
  api.addFiles(['dashboard_banner.html', 'dashboard_banner_client.js', 'dashboard_banner.less'], 'web');
});
