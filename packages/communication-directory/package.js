Package.describe({
  summary: 'One Communications Directory'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use([
    'less', 'jquery', 'templating', 
    'mrt:moment', 'stevezhu:velocity.js@0.1.0', 'routes', 
    'styles'
    ], 'web');
  api.use('files', both);

  api.addFiles([
    'communication_directory_modal.html' 

  ], 'web');

}); 