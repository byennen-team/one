Package.describe({
  summary: 'Layout templates.'
});

Package.onUse(function (api) {
  api.use([
    'templating', 'authorization', 'less',
    'styles', 'jquery', 'velocityjs:velocityjs',
    'tracker', 'session'
    ], 'web');

  api.addFiles([
    'application.html', 
    'application_client.js',
    'navbar.html', 
    'navbar.less',
    'navbar_client.js', 
    'mobile_navbar.html', 
    'mobile_navbar.less',
    'mobile_navbar_client.js', 
    'left_nav.html', 
    'leftNav.js', 
    'left_nav_client.js',
    'left_nav.less'
    ], 'web');
});
