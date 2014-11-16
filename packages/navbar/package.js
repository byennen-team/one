Package.describe({
  summary: 'NavBar'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['navbar.html', 'navbar_client.js', 'navbar.less'
               ], 'web');
});
