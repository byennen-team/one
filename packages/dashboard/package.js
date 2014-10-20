Package.describe({
  summary: 'Dashboard templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['dashboard.html',
                'dashboard.js',
                'dashboard.less',
                '_feed.html',
                '_board.html',
                '_banner.html',
                'banner.js',
                '_documents.html',
                'company_apps.html',
                'company_apps.less',
                'company_apps.js',
                'library.html'
                ], 'web');
});
