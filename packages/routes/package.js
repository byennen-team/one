Package.describe({
  summary: 'Routing and controllers.'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use(['iron:router', 'meteorhacks:fast-render'], both);
  api.use(['session', 'tracker', 'underscore', 'authorization'], 'web');
  api.use(['accounts-base', 'files'], 'server');

  api.addFiles('routes.js', both);
  api.addFiles('routes_server.js', 'server');

  api.addFiles('routes_map.js', both);

  api.addFiles(['routes_client.js', 'hooks.js'], 'web');

  api.export('Routes', both);
});
