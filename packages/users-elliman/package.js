Package.describe({
  summary: 'Populate the users collection with elliman agents.'
});

Package.onUse(function (api) {
  api.use('accounts-base', 'server');
  api.addFiles(['elliman_agents.json', 'elliman_agents_production.json'], 'server', { isAsset: true });

  api.addFiles('populate_agents.js', 'server');
});