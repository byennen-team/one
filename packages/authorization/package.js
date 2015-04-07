Package.describe({
  summary: 'Permission authorization -- roles and basic auth.'
});

Package.onUse(function (api) {
  api.use([
    'webapp', 
    'underscore',
    'digilord:roles',
    'settings'
  ], 'server');

  api.addFiles(['basic_auth.js', 'roles_server.js'], 'server');
  api.imply('digilord:roles', ['web', 'server']);
});