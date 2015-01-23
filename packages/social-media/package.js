Package.describe({
  name: 'social-media',
  summary: ' Package for linking Twitter and Facebook account to the user. ',
  version: '0.0.3'
});

var both = ['server','web'];

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');

  api.use(['http', 'aldeed:simple-schema', 'service-configuration',
    'mongo', 'oauth1', 'oauth', 'twitter',
    'facebook', 'templating', 'underscore', 'accounts-base'], both);

  api.use(['meteorhacks:async', 'settings'], 'server');

  api.addFiles('social_media.js', both);
  api.addFiles('social_media_server.js', 'server');

  api.addFiles([ 'social_media.html', 'social_media_client.js' ], 'web');

  api.export(['SocialMedia', 'SocialStatuses'], both);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('social-media');
  api.addFiles('social_media_tests.js');
});


Npm.depends({
  'twitter-text': '1.10.0'
});
