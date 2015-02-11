Package.describe({
  summary: 'One Calendar'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['calendar.html', 'calendar_modal.html'], 'web');
});
