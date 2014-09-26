Package.describe({
  summary: 'Admin templates for creating and updating companies and users.'
});

Package.onUse(function (api) {
  api.use(['templating', 'companies'], 'web');

  api.addFiles([
    'companies.html', 'companies.js',
    'companies_new.html', 'companies_new.js',
    'dashboard.html',
    'users.html'
  ], 'web');
});