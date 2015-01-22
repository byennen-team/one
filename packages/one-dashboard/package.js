Package.describe({
  summary: 'Dashboard templates.'
});

Package.onUse(function (api) {
  api.use([
    'templating',
    'less',
    'mrt:moment',
    'jquery',
    'session',
    'velocityjs:velocityjs',
    'routes',
    'styles',
    'maazalik:malihu-jquery-custom-scrollbar'
  ], 'web');

  api.addFiles([
    'dashboard.html',
    'dashboard.less',
    'dashboard_banner.html',
    'dashboard_banner_client.js',
    'dashboard_banner.less',
    //communication-sidebar
    'communication-sidebar/communication_sidebar.html',
    'communication-sidebar/communication_sidebar.less',
    'communication-sidebar/communication_sidebar_client.js',
    'communication-sidebar/communication_sidebar_filter.html',
    'communication-sidebar/communication_sidebar_filter.less',
    'communication-sidebar/communication_sidebar_filter_client.js',
    'communication-sidebar/communication_sidebar_all.html',
    'communication-sidebar/communication_sidebar_all_client.js',
    'communication-sidebar/communication_sidebar_company.html',
    'communication-sidebar/communication_sidebar_company.less',
    'communication-sidebar/communication_sidebar_company_client.js',
    'communication-sidebar/communication_sidebar_direct.html',
    'communication-sidebar/communication_sidebar_direct.less',
    'communication-sidebar/communication_sidebar_direct_client.js',
    'communication-sidebar/communication_sidebar_rooms.html',
    'communication-sidebar/communication_sidebar_rooms.less',
    'communication-sidebar/communication_sidebar_rooms_client.js',
    //messages
    // TODO: this is old code.
    //       Just putting this here until the new dashboard is approved. Remove.
    'messages/messages.html',
    'messages/messages_client.js',
    'messages/messages.less',
    'messages/messages_widget.html'
  ], 'web');
});
