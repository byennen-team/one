Package.describe({
  summary: 'Profile helpers.'
});

Package.onUse(function (api) {
  api.addFiles('profile.js', 'web');

  api.export('Profile', 'web');
});