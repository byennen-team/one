Package.describe({
  name: 'one-infinite-scroll-list',
  version: '0.0.0',
  // Brief, one-line summary of the package.
  summary: 'An infinite scroll list',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  api.use([
    'less',
    'templating',
    'percolate:paginated-subscription@0.2.4',
    'aldeed:template-extension@3.4.1'
  ], 'web');

  api.addFiles([
    'one_infinite_scroll_list.less',
    'one_infinite_scroll_list.html',
    'one_infinite_scroll_list.js',
    'one_infinite_scroll_list_for_table.less',
    'one_infinite_scroll_list_for_table.html',
    'one_infinite_scroll_list_for_table.js'
  ], 'web');
});
