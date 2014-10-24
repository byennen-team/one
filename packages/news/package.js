Package.describe({
  summary: 'One News'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['news.html', 'news_client.js', 'news.less'], 'web');
});
