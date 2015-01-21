// Need fast-render for this to work
// https://github.com/EventedMind/iron-router/issues/649#issuecomment-49290429
var currentUser = function (request) {
  /* jshint camelcase: false */
  if (!request.cookies.meteor_login_token) return null;

  var hashedToken = Accounts._hashLoginToken(
    request.cookies.meteor_login_token
  );
  return Meteor.users.findOne({
    'services.resume.loginTokens.hashedToken': hashedToken
  });
  /* jshint camelcase: true */
};

var unauthorized = function (response) {
  response.writeHead(401);
  response.end('Unauthorized');
};

Routes.Server.getFiles = function () {
  try {
    var filePath = decodeURIComponent(this.params.query.path);

    var user = currentUser(this.request);
    if (!user) return unauthorized(this.response);

    var paths = filePath.split('/');
    var companyDocument = paths[0] === 'company';
    /* jshint noempty: false */
    if (companyDocument) {
      // TODO check they have access to the company of paths[1]
    } else if (user._id !== paths[1]) return unauthorized(this.response);
    /* jshint noempty: true */

    this.response.writeHead(302, {
      Location: FileTools.signedGet(filePath)
    });
    this.response.end();
  } catch (e) {
    console.error('Server.getFiles', e);
    this.response.writeHead(500);
    this.response.end();
  }
};
