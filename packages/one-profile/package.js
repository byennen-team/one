Package.describe({
  summary: 'One Profile'
});

Package.onUse(function (api) {

  api.use([
    'templating',
    'less',
    'reactive-var',
    'jquery',
    'velocityjs:velocityjs',
    'mquandalle:bower@0.1.11',
    'styles',
    'one-email',
    'mrt:moment',
    'horka:swipebox',
    'social-media'
    ], 'web');

  api.use(['aldeed:simple-schema','files','one-dashboard'],
    ['server','client']);


  // less
  api.addFiles([
    'lib/client/less/profile_about.less',
    'lib/client/less/profile.less',
    'lib/client/less/profile_card.less',
    'lib/client/less/profile_nav.less',
    'lib/client/less/profile_activity.less',
    'lib/client/less/profile_banner.less',
    'lib/client/less/profile_followers.less',
    'lib/client/less/profile_gallery.less',
    'lib/client/less/gallery_modal.less',
    'lib/client/less/profile_header.less',
    'lib/client/less/profile_network.less',
    'lib/client/less/profile_property_search.less',
    'lib/client/less/profile_testimonial.less',
    'lib/client/less/profile_buyer.less',
    'lib/client/less/profile_contact.less',
    'lib/client/less/profile_footer.less',
    'lib/client/less/profile_gallery_mobile_controls.less'
  ], 'web');


  api.addFiles([
    'gallery/gallery.js'], ['server','web']);
  //server files
  api.addFiles([
    'gallery/gallery_server.js'], 'server');


  // modals
  api.addFiles([
    'lib/client/modals/profile_common_modal.js',
    'lib/client/modals/profile_header_image_modal.html',
    'lib/client/modals/profile_header_image_modal.js',
    'lib/client/modals/profile_header_delete_image_modal.html',
    'lib/client/modals/profile_header_delete_image_modal.js',
    'lib/client/modals/profile_contact_message_success_modal.html',
    'lib/client/modals/profile_contact_message_failed_modal.html',
    'lib/client/modals/profile_activity_link_modal.html',
    'lib/client/modals/gallery_modal.html',
    'lib/client/modals/profile_add_team_modal.html',
    'lib/client/modals/profile_add_gallery_modal.html',
    'lib/client/modals/profile_add_gallery_modal.js',
    'lib/client/modals/profile_add_picture_gallery_modal.html',
    'lib/client/modals/profile_add_picture_gallery_modal.js',
    'lib/client/modals/profile_gallery_mobile_controls.html',
    'lib/client/modals/profile_gallery_mobile_controls_client.js'
    ], 'web');

  // templates
  api.addFiles([
    'lib/client/templates/profile.js',
    'lib/client/templates/profile_about.html',
    'lib/client/templates/profile_about.js',
    'lib/client/templates/profile.html',
    'lib/client/templates/profile_client.js',
    'lib/client/templates/profile_card.html',
    'lib/client/templates/profile_card.js',
    'lib/client/templates/profile_nav.html',
    'lib/client/templates/profile_nav.js',
    'lib/client/templates/profile_activity.html',
    'lib/client/templates/profile_activity.js',
    'lib/client/templates/profile_banner.html',
    'lib/client/templates/profile_banner_client.js',
    'lib/client/templates/profile_followers.html',
    'lib/client/templates/profile_followers.js',
    'lib/client/templates/profile_following.html',
    'lib/client/templates/profile_following.js',
    'lib/client/templates/profile_network.html',
    'lib/client/templates/profile_gallery.html',
    'lib/client/templates/profile_gallery.js',
    'lib/client/templates/profile_header.html',
    'lib/client/templates/profile_header.js',
    'lib/client/templates/profile_property_search.html',
    'lib/client/templates/profile_property_search_client.js',
    'lib/client/templates/profile_testimonial.html',
    'lib/client/templates/profile_buyer.html',
    'lib/client/templates/profile_contact.html',
    'lib/client/templates/profile_contact_client.js',
    'lib/client/templates/profile_screen_client.js',
    'lib/client/templates/profile_footer.html',
    'gallery/gallery_client.js'
    ], 'web');

  // Bower packages
  api.addFiles(['smart.json'], 'web');

  api.export(['Profile'], 'web');
});
