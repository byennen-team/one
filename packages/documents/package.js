Package.describe({
  summary: 'One Documents'
});

Package.onUse(function (api) {
  api.use(['templating', 'less'], 'web');
  api.addFiles(['my_documents.html', 'company_documents.html', 'favorite_documents.html',
                'documents_widget.html', 'documents.less', 'upload_modal.html']
                , 'web');
});
