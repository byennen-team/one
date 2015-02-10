Package.describe({
  name: 'one-documents-core',
  version: '0.0.0',
  summary: 'Core functionality for documents',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  api.export([
    'DocumentTools'
  ], 'web');

  api.use([
    'underscore'
  ]);

  api.addFiles([
    'document_tools_client.js'
  ], 'web');
});
