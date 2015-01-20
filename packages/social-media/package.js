Package.describe({
  name: 'social-media',
  summary: ' Package for linking Twitter and Facebook account to the user. ',
  version: '0.0.1'
});

var both = ['server','web']

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');

  api.use(['service-configuration', 'twitter', 'facebook', 'templating'], both);

  api.use('settings', 'server');

  api.addFiles('social_media_server.js', 'server');

  api.addFiles([ 'social_media.html', 'social_media.js' ], 'web');

  api.export(['SocialMedia', 'Statuses'], both)
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('social-media');
  api.addFiles('social_media_tests.js');
});
