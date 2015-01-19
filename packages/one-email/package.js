Package.describe({
  "summary": "One Email - Send email via Mandrill's send-template.json",
});

Package.onUse(function(api) {
  api.use(['email', 'http'], ['server']);
  api.addFiles(['mandrill.js', 'email_server.js', 'emails.js'], 'server');
});
