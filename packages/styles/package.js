Package.describe({
  summary: 'Common styles.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');

  api.addFiles(['main.less', 'buttons.less', 'colors.less',
                'padding_and_margin.less', 'cleanup.less', 'go_one_icons.less'
               ], 'web');

  //style guide
  api.addFiles('style_guide.html', 'web')
});
