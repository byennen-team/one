Package.describe({
  summary: 'One Communications Sidebar'
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
    'com_sidebar.html', 'com_sidebar.less', 'com_sidebar_client.js',
    'com_sidebar_filter.html', 'com_sidebar_filter.less', 'com_sidebar_filter_client.js', 
    'com_sidebar_all.html', 
    'com_sidebar_company.html', 'com_sidebar_company.less', 
    'com_sidebar_direct.html', 'com_sidebar_direct.less', 'com_sidebar_direct_client.js',
    'com_sidebar_rooms.html', 'com_sidebar_rooms.less',

    'com_main.html', 'com_main.less', 'com_main_client.js',
    'com_channel.html', 'com_channel.less', 'com_channel_client.js',
    'com_room.html', 'com_room.less', 'com_room_client.js',
    'com_msg_board.html', 'com_msg_board.less', 'com_msg_board_client.js',
    'com_task_board.html', 'com_task_board.less', 'com_task_board_client.js',
    'com_lib_board.html', 'com_lib_board.less', 'com_lib_board_client.js',
    'com_msg_input.html', 'com_msg_input.less', 'com_msg_input_client.js'
 
  ], 'web');

}); 