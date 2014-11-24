Package.describe({
  summary: 'One profile'
});

Package.onUse(function (api) {
  api.use(['less', 'reactive-var', 'templating'], 'web');

  api.addFiles(['profile.html', 'profile_client.js', 'profile.less',
    'profile_nav.html', 'profile_nav.less'
  ], 'web');
});
