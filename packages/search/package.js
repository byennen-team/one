Package.describe({
  summary: 'One Search'
});

//Question: If I include user-elliman package should I be able to find the user?
Package.onUse(function (api) {
  api.use(['templating', 'less', 'matteodem:easy-search'], 'web');
  api.addFiles(['search.html', 'search.less', 'search_client.js'], 'web');
});
