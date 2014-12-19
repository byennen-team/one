Package.describe({
  summary: 'Profile helpers.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'reactive-var', 'jquery', 'stevezhu:velocity.js@0.1.0'], 'web');

  api.addFiles([
    'profile.js', 'profile_about.html', 'profile_about.less',
    'profile.html', 'profile_client.js', 'profile.less',
    'profile_card.html', 'profile_card.js', 'profile_card.less',
    'profile_nav.html', 'profile_nav.less', 'profile_nav.js',
    'profile_activity.html', 'profile_activity.less',
    'profile_banner.html', 'profile_banner_client.js', 'profile_banner.less',
    'profile_followers.html', 'profile_followers.less', 'profile_followers.js',
    'profile_following.html', 'profile_following.js',
    'profile_gallery.html', 'profile_gallery.less', 'gallery_modal.html',
    'gallery_modal.less',
    'profile_header.html', 'profile_header.less', 'profile_header.js',
    'profile_property_search.html', 'profile_property_search.less', 'profile_property_search_client.js',
    'profile_testimonial.html', 'profile_testimonial.less',
    'profile_buyer.html', 'profile_buyer.less',
    'profile_contact.html', 'profile_contact.less',
    'profile_footer.html', 'profile_footer.less',
    'modals/profile_header_image_modal.html', 'modals/profile_header_delete_image_modal.html',
    'modals/profile_contact_message_success_modal.html', 'modals/profile_contact_message_failed_modal.html'
    ], 'web');

  api.addFiles('profile_cleanup.less', 'web')// TODO: remove this after Dave cleans this up

  api.export('Profile', 'web');
});
