Package.describe({
  summary: 'One Communications - main panel'
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
    'communication_main.html', 'communication_main.less', 'communication_main_client.js',
    'communication_channel.html', 'communication_channel.less', 'communication_channel_client.js',
    'communication_room.html', 'communication_room.less', 'communication_room_client.js',
    'communication_message_board.html', 'communication_message_board.less', 'communication_message_board_client.js',
    'communication_message_input.html', 'communication_message_input.less', 'communication_message_input_client.js'
 
  ], 'web');

}); 