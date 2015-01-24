Package.describe({
  summary: 'One Documents'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use([
    'less', 'jquery', 'session', 'underscore',
    'templating', 'mrt:moment', 'natestrauser:select2@3.4.9',
    'velocityjs:velocityjs', 'mquandalle:bower', 'routes', 'files'
    ], 'web');
  api.use('files', both);

  api.addFiles([
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
    'documents_menu.less'

  ], 'web');

  // Bower packages
  api.addFiles(['smart.json'], 'web');

  api.addFiles('documents_server.js', 'server');
});
