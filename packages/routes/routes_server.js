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

/**
* Return a signed url to read the filePath.
*/

Routes.Server.getFiles = function () {
  // var response = this.response;
  try {
    console.log("1", this.params.path);
    var filePath = decodeURIComponent(this.params.path);
    console.log("2");
    var user = currentUser(this.request);
    console.log("3");
    if (!user) return unauthorized(this.response);
    console.log("4");
    var paths = filePath.split('/');
    console.log("5");
    var companyDocument = paths[0] === 'company';
    console.log("6");
    if (companyDocument) {
      // TODO check they have access to the company of paths[1]
    } else if (user._id !== paths[1]) return unauthorized(this.response);
    console.log(filePath);
    this.response.writeHead(302, {
      Location: FileTools.signedGet(filePath)
    });
    console.log("8");
    this.response.end();
  } catch (e) {
    console.error('Server.getFiles', e);
    this.response.end(500);
  }
};
