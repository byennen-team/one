Package.describe({
  summary: 'One profile'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'profile'], 'web');
  api.addFiles([
    'profile_banner.html', 'profile_banner_client.js', 'profile_banner.less'
  ], 'web');
});