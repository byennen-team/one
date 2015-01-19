Package.describe({
  summary: 'One Communications Library'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use([
    'less',
    'jquery',
    'session',
    'templating',
    'mrt:moment',
    'stevezhu:velocity.js@0.1.0',
    'routes',
    'styles',
    'maazalik:malihu-jquery-custom-scrollbar'
    ], 'web');

  api.addFiles([
    'communication_library_board.html',
    'communication_library_board.less',
    'communication_library_board_client.js',
    'communication_library_members.html',
    'communication_library_members.less',
    'communication_library_members_client.js',
    'communication_library_files.html',
    'communication_library_files.less',
    'communication_library_files_client.js'
  ], 'web');

});
