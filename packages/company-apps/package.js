Package.describe({
  summary: 'Company Apps.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['company_apps.html', 'company_apps.js', 'company_apps.less'], 'web');
});
