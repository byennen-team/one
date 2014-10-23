Package.describe({
  name: 'library',
  summary: 'One Library for document storage.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['library.html', 'library.js', 'library.less'], 'web');
});
