Package.describe({
  summary: 'One Communications'
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
    'com_sidebar_direct.html', 'com_sidebar_direct.less', 
    'com_sidebar_rooms.html', 'com_sidebar_rooms.less'
 
  ], 'web');

});