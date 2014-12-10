Package.describe({
  summary: 'Profile helpers.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less', 'reactive-var'], 'web');

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
    'gallery_modal.less'
    ], 'web');

  api.export('Profile', 'web');
});
