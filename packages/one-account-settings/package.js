Package.describe({
  summary: 'Account Settings'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use([
    'cfs:reactive-list@0.0.9',
    'cfs:power-queue@0.9.11'
  ], 'server');

  api.use('files', both);

  api.use('random', 'server');

  api.use(['templating', 'joshowens:simple-form@0.2.2', 'less'], 'web');

  api.addFiles(['account_settings.html', 'account_settings.less'], 'web');
  api.addFiles('account_settings_client.js', 'web');
  api.addFiles('account_settings_server.js', 'server');
});
