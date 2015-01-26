Package.describe({
  name: 'jstree',
  version: '3.0.9',
  summary: 'jquery tree plugin http://jstree.com',
  git: 'https://github.com/vakata/jstree.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('mquandalle:bower', 'web');
  api.addFiles('smart.json', 'web');
});
