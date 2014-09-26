Package.describe({
  summary: 'Routing and controllers.'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use('iron:router', both);
  api.use(['underscore', 'authorization'], 'web');

  api.addFiles(['routes_enum.js', 'routes_map.js'], both);
  api.addFiles('hooks.js', 'web');
});