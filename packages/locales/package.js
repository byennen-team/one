Package.describe({
  summary: 'Localization.'
});

Package.onUse(function (api) {
  api.use('anti:i18n', 'web');
  api.addFiles('en.js', 'web');
});