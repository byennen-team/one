Package.describe({
  summary: 'Companies.'
});

Package.onUse(function (api) {
  var both = ['server', 'web'];

  api.addFiles('companies_common.js');
  api.addFiles('companies_server.js', 'server');

  api.export('Companies', both);
});