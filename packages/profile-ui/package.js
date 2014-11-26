Package.describe({
  summary: 'One profile'
});

Package.onUse(function (api) {
  api.use([
    'less', 'reactive-var', 'templating',
    'profile'
  ], 'web');

  api.addFiles([
    'profile.html', 'profile_client.js', 'profile.less',
    'profile_card.html', 'profile_card.js',
    'profile_nav.html', 'profile_nav.less', 'profile_nav.js'
  ], 'web');
});
