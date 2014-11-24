Package.describe({
  summary: 'Profile followers / following'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');

  api.addFiles([
    'profile_followers.html', 'profile_followers.less', 'profile_followers.js',
    'profile_following.html', 'profile_following.js'
  ], 'web');
});