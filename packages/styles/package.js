Package.describe({
  summary: 'Common styles.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');

  api.addFiles(['colors.less', 'main.less', 'one_strap.less', 
  							'buttons.less', 'padding_and_margin.less', 'cleanup.less', 
  							'go_one_icons.less', 'form.less', 'typography.less', 
                'modals.less'
               ], 'web');

  //style guide
  api.addFiles('style_guide.html', 'web')
});
