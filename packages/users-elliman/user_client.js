var loginTokenKey = 'Meteor.loginToken',
  loginTokenExpiresKey = 'Meteor.loginTokenExpires';

// Subscribe to the current user
Meteor.subscribe('user');

/**
 * Login with an elliman agentId.
 * @param agentId
 * @param callback
 */
Meteor.loginWithElliman = function (agentId, callback) {
  Meteor.call('loginWithElliman', agentId, function (error, result) {
    if (error) {
      //TODO: better error messages. Maybe setup flash notications.
      console.log(error.message);
      $('.error').show();
      callback && callback.apply(this, arguments);
      return;
    }

    // this will update Meteor.user()
    Accounts.connection.setUserId(result.userId);

    // set the login token so fast-render will work
    Meteor._localStorage.setItem(loginTokenKey, result.token);
    Meteor._localStorage.setItem(loginTokenExpiresKey, result.tokenExpires);

    callback && callback.apply(this, arguments);
  });
};
