Package.describe({
  summary: 'A light wrapper for the aws sdk.'
});

Package.onUse(function (api) {
  api.addFiles('aws.js', 'server');

  api.export('AWS', 'server');
});

Npm.depends({
  'aws-sdk': '2.0.14'
});