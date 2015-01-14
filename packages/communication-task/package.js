Package.describe({
  summary: 'One Communications Task List'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use([
    'less', 'jquery', 'session',
    'templating', 'mrt:moment', 'stevezhu:velocity.js@0.1.0', 
    'routes', 'styles'
    ], 'web');
  api.use('files', both);

  api.addFiles([
    'communication_task_board.html', 'communication_task_board.less', 'communication_task_board_client.js'
 
  ], 'web');

}); 