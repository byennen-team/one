// Need fast-render for this to work
// https://github.com/EventedMind/iron-router/issues/649#issuecomment-49290429
var currentUser = function (request) {
  if (!request.cookies.meteor_login_token) return null;

  return Meteor.users.findOne({'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(request.cookies.meteor_login_token)});
};

var unauthorized = function (response) {
  response.writeHead(401);
  response.end('Unauthorized');
};

Router.route('/files/:path', {where: 'server'})
  .get(function () {
    var filePath = decodeURIComponent(this.params.path);

    var user = currentUser(this.request);
    if (!user) return unauthorized(this.response);

    var paths = filePath.split('/');
    var companyDocument = paths[0] === 'company';
    if (companyDocument) {
      // TODO check they have access to the company of paths[1]
    } else if (user._id !== paths[1]) return unauthorized(this.response);

    this.response.writeHead(302, {
      Location: FileTools.signedGet(filePath)
    });
    this.response.end();
  });