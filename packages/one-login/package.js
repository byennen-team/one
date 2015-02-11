Package.describe({
  summary: 'Login templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'reactive-var', 'less', 'users-elliman'], 'web');

  api.addFiles(['login.html', 'login.js', 'login.less'], 'web');
});
