
Package.describe({
  summary: 'Share Document Modal'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use(['templating', 'less'], 'web');

  api.addFiles([
    'share_document_modal.html', 'share_document_modal.js', 'share_document_modal.less'
  ], 'web');
});
