Package.describe({
  summary: " Notifications package ",
  version: "1.0.0"
});
var both = ['server','web'];
Package.onUse(function(api) {
	api.use(['aldeed:simple-schema','templating', 'authorization', 'less',
    'styles', 'jquery', 'velocityjs:velocityjs',
    'tracker', 'session', 'maazalik:malihu-jquery-custom-scrollbar'], both);

	api.versionsFrom('METEOR@0.9.3.1');
	api.addFiles('notifications.js', ['server', 'web']);

	api.addFiles('notifications_server.js','server');

	api.addFiles([
		'notifications.html',
		'notifications_client.js',
		'notifications.less',
    'notifications_popup.html',
    'notifications_popup.less',
    'notifications_popup_client.js'
		], 'web');


	api.export(['Notifications', 'Notify'], both);
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('notifications');
	api.addFiles('notifications_tests.js');
});
