Package.describe({
  summary: 'Profile Followers'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['profile_followers.html', 'profile_followers.less'
  ], 'web');
});
