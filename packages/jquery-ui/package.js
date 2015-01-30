/*
 * This is a custom build of jQuery UI.
 * Use this URL to create a custom build for a newer version or add components.
 * Don't forget to update the URL after you have done a update.
 *
 * http://jqueryui.com/download/#!version=1.11.2&themeParams=none&components=1111110000000000000000000000000000000
 */

Package.describe({
  name: 'jquery-ui',
  version: '1.11.2'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles([
    'dist/jquery-ui.js',
    'dist/jquery-ui.css'
  ], 'web');
});
