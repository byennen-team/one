Package.describe({
  summary: 'Documents Menu'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'jquery', 'stevezhu:velocity.js@0.1.0'], 'web');

  api.addFiles([
    'documents_menu.less', 'documents_menu.html', 'documents_menu_client.js'
  ], 'web');
});
