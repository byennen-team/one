Package.describe({
  summary: 'Layout templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'authorization', 'left-nav'], 'web');
  api.addFiles(['_footer.html', '_header.html', 'application.html', 'application.js', 'application.css'], 'web');
});
