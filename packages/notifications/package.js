Package.describe({
  summary: " Notifications package ",
  version: "1.0.0"
});
var both = ['server','web'];
Package.onUse(function(api) {
	api.use(['aldeed:simple-schema'], both);	
	api.versionsFrom('METEOR@0.9.3.1');
	api.addFiles('notifications.js', ['server', 'web']);
	
	api.addFiles('notifications-server.js','server');

	api.addFiles('notifications-client.js', 'web');
  

	api.export(['Notifications', 'Notify'], both);
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('notifications');
	api.addFiles('notifications-tests.js');
});
