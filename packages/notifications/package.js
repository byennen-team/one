Package.describe({
  summary: " \* Fill me in! *\ ",
  version: "1.0.0",
  git: " \* Fill me in! *\ "
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.3.1');
  api.addFiles('notifications.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('notifications');
  api.addFiles('notifications-tests.js');
});
