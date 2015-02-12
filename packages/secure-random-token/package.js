Package.describe({
  name: 'secure-random-token',
  version: '1.0.0',
  summary: 'Generates a secure random token that can be used in URLs'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.export('SecureRandomToken', 'server');
  api.addFiles('secure-random-token.js', 'server');
});
