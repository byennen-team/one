Package.describe({
  summary: 'Common styles.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');

  api.addFiles(['custom.bootstrap.json', 'style.less'
               ], 'web');

  //style guide
  api.addFiles('style_guide.html', 'web');
});
