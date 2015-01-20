Package.describe({
  name: 'social-media',
  summary: ' Package for linking Twitter and Facebook account to the user. ',
  version: '0.0.1'
});

var both = ['server','web']

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');

  api.use(['twitter','facebook']);

  api.addFiles('social_media.js');

  api.export(['SocialMedia','Statuses'],both)
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('social-media');
  api.addFiles('social_media_tests.js');
});
