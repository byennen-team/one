Package.describe({
  summary: 'Populate the users collection with elliman agents.'
});

Package.onUse(function (api) {
  var both = ['server', 'web'];

  api.use(['accounts-base', 'check', 'jonperl:match-ex@0.1.2'], both);

  api.addFiles(['elliman_agents.json', 'elliman_agents_production.json'], 'server', {isAsset: true});

  api.addFiles('user_common.js', both);
  api.addFiles(['user_slug.js', 'populate_agents.js', 'user_server.js'], 'server');
  api.addFiles('user_client.js', 'web');

  api.export('User', both);
});
