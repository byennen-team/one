Package.describe({
  summary: 'One Communications Sidebar'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use([
    'less',
    'jquery',
    'session',
    'templating',
    'mrt:moment',
    'stevezhu:velocity.js@0.1.0',
    'routes',
    'styles',
    'maazalik:malihu-jquery-custom-scrollbar'
    ], 'web');

  api.addFiles([
    'communication_sidebar.html',
    'communication_sidebar.less',
    'communication_sidebar_client.js',
    'communication_sidebar_filter.html',
    'communication_sidebar_filter.less',
    'communication_sidebar_filter_client.js',
    'communication_sidebar_all.html',
    'communication_sidebar_all_client.js',
    'communication_sidebar_company.html',
    'communication_sidebar_company.less',
    'communication_sidebar_company_client.js',
    'communication_sidebar_direct.html',
    'communication_sidebar_direct.less',
    'communication_sidebar_direct_client.js',
    'communication_sidebar_rooms.html',
    'communication_sidebar_rooms.less',
    'communication_sidebar_rooms_client.js'
  ], 'web');
});
