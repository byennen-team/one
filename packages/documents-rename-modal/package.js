Package.describe({
  summary: 'New Folder Modal'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use(['templating', 'less'], 'web');

  api.addFiles([
    'documents_rename_modal.html', 'documents_rename_modal.js', 'documents_rename_modal.less'
  ], 'web');
});
