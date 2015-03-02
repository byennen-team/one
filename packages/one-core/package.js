Package.describe({
  name: 'one-core',
  version: '0.0.0',
  summary: 'Common things that are used in the whole app.',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  api.export([
    'Helpers'
  ]);

  api.use([
    'templating'
  ]);

  api.addFiles([
    'helpers.js'
  ]);

  api.addFiles([
    'template_helpers.js'
  ], 'client');
});
