Package.describe({
  summary: 'Profile About'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['profile_about.html', 'profile_about.less'
  ], 'web');
});
