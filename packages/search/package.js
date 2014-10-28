Package.describe({
  summary: 'One Search'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'matteodem:easy-search', 'users-elliman'], 'web');
  api.addFiles(['search.html', 'search.less', 'search.js'], 'web');
});
