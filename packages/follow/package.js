Package.describe({
  summary: 'Follow users or teams.'
});

Package.onUse(function (api) {
  var both = ['server', 'web'];

  api.use(['check', 'jonperl:match-ex@0.1.2'], both);

  api.addFiles('follow.js', both);
  api.addFiles('follow_server.js', 'server');

  api.export(['Followers', 'Following'], both);
});