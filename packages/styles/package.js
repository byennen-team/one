Package.describe({
  summary: 'Common styles.'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');

  api.addFiles(['custom.bootstrap.json', 'colors.less', 'scrollbar.less', 
  							'main.less', 'one_strap.less', 'buttons.less', 
  							'dropdown.less', 'padding_and_margin.less', 'cleanup.less', 
  							'go_one_icons.less', 'form.less', 'typography.less', 
  							'modals.less', 'tooltip.less', 'positioning.less'

               ], 'web');

  //style guide
  api.addFiles('style_guide.html', 'web');
});
