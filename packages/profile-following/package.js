Package.describe({
  summary: 'Profile Following'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['profile_following.html'
  ], 'web');
});
