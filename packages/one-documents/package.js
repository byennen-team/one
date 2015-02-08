Package.describe({
  summary: 'One Documents'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.export([
    'SharedDocument',
    'SharedDocuments'
  ], both);

  api.use([
    'underscore',
    'momentjs:moment@2.8.4',
    'aldeed:simple-schema@1.3.0',
    'aldeed:collection2@2.3.1',
    'files'
  ], both);

  api.use([
    'less',
    'jquery',
    'session',
    'templating',
    'natestrauser:select2@3.5.1',
    'velocityjs:velocityjs',
    'mquandalle:bower@0.1.11',
    'routes',
    'files',
    'jstree',
    'jquery-ui'
    ], 'web');

  api.use([
    'secure-random-token',
    'percolate:synced-cron@1.1.1'
  ], 'server');

  api.addFiles([
    'sharing/shared_document.js',
    'sharing/shared_documents.js'
  ], both);

  api.addFiles([
    'document_row.html',
    'document_row.js',
    'document_row.less',
    'documents.html',
    'documents_client.js',
    'documents.less',
    'documents_breadcrumb.html',
    'documents_breadcrumb.js',
    'documents_breadcrumb.less',
    'documents_widget.html',
    'new_folder_modal.html',
    'new_folder_modal.js',
    'new_folder_modal.less',
    'documents_rename_modal.html',
    'documents_rename_modal.js',
    'documents_rename_modal.less',
    'documents_upload_modal.html',
    'documents_upload_modal.js',
    'documents_upload_modal.less',
    'documents_move_to_modal.html',
    'documents_move_to_modal.js',
    'documents_move_to_modal.less',
    'share_document_modal.html',
    'share_document_modal.js',
    'share_document_modal.less',
    'email_document_modal.html',
    'email_document_modal.js',
    'favorite_documents.html',
    'favorite_documents.js',
    'favorite_documents.less',
    'documents_menu.html',
    'documents_menu_client.js',
    'documents_menu.less',
    'sharing/sharing_client.js'

  ], 'web');

  // Bower packages
  api.addFiles(['smart.json'], 'web');

  api.addFiles([
    'documents_server.js',
    'sharing/sharing_server.js'
  ], 'server');
});
