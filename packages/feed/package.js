Package.describe({
  summary: 'One Feed'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['feed.html', 'feed_client.js', 'feed.less'], 'web');
});
