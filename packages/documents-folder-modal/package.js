
Package.describe({
  summary: 'New Folder Modal'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use(['templating', 'less'], 'web');

  api.addFiles([
    'new_folder_modal.html', 'new_folder_modal.less'
  ], 'web');
});
