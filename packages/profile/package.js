Package.describe({
  summary: 'Profile templates.'
});

Package.onUse(function (api) {
  api.use('templating', 'web');

  api.addFiles(['profile.html', 'profile.js'], 'web');
});