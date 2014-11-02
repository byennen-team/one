Package.describe({
  summary: 'Left Navigation'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'jquery', 'stevezhu:velocity.js@0.1.0'], 'web');
  api.addFiles(['left_nav.html', 'leftNav.js', 'left_nav_client.js',
                'left_nav.less']
                , 'web');
});
