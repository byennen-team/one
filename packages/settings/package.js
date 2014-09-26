Package.describe({
  summary: 'Settings helpers.'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.addFiles('settings.js', both);

  api.export('Settings', both);
});