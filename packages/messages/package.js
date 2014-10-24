Package.describe({
  summary: 'One Messages'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['messages.html', 'messages_client.js', 'messages.less'], 'web');
});
