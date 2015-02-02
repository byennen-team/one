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
    'settings',
    'reactive-var',
    'social-media',
    'maazalik:malihu-jquery-custom-scrollbar',
    'mquandalle:bower@0.1.11'
  ], 'web');

   api.addFiles(['dashboard.js'], 'server');
    api.addFiles([
    'dashboard.html',
    'dashboard.less',
    'dashboard_banner.html',
    'dashboard_skycons_client.js',
    'dashboard_banner_client.js',
    'dashboard_banner.less',
    'dashboard_event.html',
    'dashboard_event.less',
    'dashboard_event_client.js',
    'dashboard_widget_search.html',
    'dashboard_widget_search.less',
    'dashboard_widget_search_client.js',
    'dashboard_delete_event_modal.html',
    'dashboard_skycons_client.js',
    'dashboard_channel_widget.html',
    'dashboard_channel_widget.less',
    'dashboard_channel_widget_client.js',
    'dashboard_twitter_widget.html',
    'dashboard_twitter_widget.less',
    'dashboard_twitter_widget_client.js',
    'dashboard_news_widget.html',
    'dashboard_news_widget.less',
    'dashboard_news_widget_client.js',
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
