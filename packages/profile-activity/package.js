Package.describe({
  summary: 'Profile Activity'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['profile_activity.html', 'profile_activity.less'
  ], 'web');
});
