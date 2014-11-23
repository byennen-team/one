Package.describe({
  summary: 'Profile Gallery'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['profile_gallery.html', 'profile_gallery.less',
                'gallery_modal.html', 'gallery_modal.less'
  ], 'web');
});
