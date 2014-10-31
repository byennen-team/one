Package.describe({
  summary: 'Profile templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'joshowens:simple-form'], 'web');

  api.addFiles(['profileEdit.html', 'profileEdit.js'], 'web');
});
