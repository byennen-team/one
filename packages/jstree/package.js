Package.describe({
  name: 'jstree',
  version: '3.0.9',
  summary: 'jquery tree plugin http://jstree.com',
  git: 'https://github.com/vakata/jstree.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles([
    'dist/jstree.js',
    'dist/themes/default/style.css',
    'dist/themes/default/32px.png',
    'dist/themes/default/40px.png',
    'dist/themes/default/throbber.gif'
  ], 'web');
});
