Package.describe({
  summary: 'Layout templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'authorization', 'left-nav', 'less'], 'web');
  api.addFiles(['_footer.html', '_header.html', 'application.html',
                'application_client.js', 'application.less'
               ], 'web');
});
