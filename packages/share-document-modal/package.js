
Package.describe({
  summary: 'Share Document Modal'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'natestrauser:select2@3.4.9'], 'web');

  api.addFiles([
    'share_document_modal.html', 'share_document_modal.js', 'share_document_modal.less'
  ], 'web');
});