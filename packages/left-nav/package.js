Package.describe({
  summary: 'Left Navigation'
});

Package.onUse(function (api) {
  api.use(['templating', 'jquery', 'stevezhu:velocity.js@0.1.0'], 'web');
  api.addFiles(['left_nav.html', 'left_nav.js', 'left_nav.css'], 'web');
});
