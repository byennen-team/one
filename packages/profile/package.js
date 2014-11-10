Package.describe({
  summary: 'Profile templates.'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use('files', both);

  api.use('random', 'server');
  api.use(['templating', 'joshowens:simple-form', 'less'], 'web');

  api.addFiles('profile.js', both);

  api.addFiles('profile.js', 'server');

  api.addFiles([
    'profile_edit.html', 'profile_edit.js', 'profile.less'
  ], 'web');

  api.addFiles('profile_server.js', 'server');
});
