Package.describe({
  summary: 'Common styles.'
});

Package.onUse(function (api) {
  api.use([
    'templating',
    'less',
  ], 'web');

  api.addFiles([
    'colors.less',
    'breadcrumbs.less',
    'scrollbar.less',
    'main.less',
    'one_strap.less',
    'buttons.less',
  	'dropdown.less',
    'padding_and_margin.less',
    'cleanup.less',
    'go_one_icons.less',
    'form.less',
    'typography.less',
  	'modals.less',
    'tooltip.less',
    'positioning.less',
    'select.less',
    'selectpicker.less',
    'datetimepicker.less',
    'variables.import.less',
    'velocity_html_reporter.less'
  ], 'web');

  //style guide
  api.addFiles('style_guide.html', 'web');
});
