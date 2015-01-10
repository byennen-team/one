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
    'com_main.html', 'com_main.less', 'com_main_client.js' 
  ], 'web');

});