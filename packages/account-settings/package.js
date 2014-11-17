Package.describe({
  summary: 'Account Settings'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use('files', both);

  api.use('random', 'server');

  api.use(['templating', 'joshowens:simple-form', 'less'], 'web');

  api.addFiles(['account_settings.html', 'account_settings.less'], 'web');
  api.addFiles('account_settings_client.js', 'web');
  api.addFiles('account_settings_server.js', 'server');
});
