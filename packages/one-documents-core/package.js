Package.describe({
  name: 'one-documents-core',
  version: '0.0.0',
  summary: 'Core functionality for documents',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  api.export([
    'DocumentTools',
    'DocumentSubscriptions'
  ], 'web');

  api.use([
    'underscore',
    'files'
  ]);

  api.addFiles([
    'document_tools_client.js',
    'document_subscriptions_client.js'
  ], 'web');
});
