Package.describe({
  summary: 'Dashboard templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['dashboard.html',
                'dashboard_client.js',
                'dashboard.less',
                '_documents.html'
                ], 'web');
});
