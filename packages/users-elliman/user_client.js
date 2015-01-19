var loginTokenKey = 'Meteor.loginToken',
  loginTokenExpiresKey = 'Meteor.loginTokenExpires';

// Subscribe to the current user
Meteor.subscribe('user');

/**
 * Login with an elliman agentId.
 * @param agentId
 * @param callback
 */
Meteor.loginWithElliman = function (agentId, agentEmail, callback) {
  Meteor.call('loginWithElliman', agentId, agentEmail, function (error, result) {
    if (error) {
      if (callback)
        callback.apply(this, arguments);
      return;
    }

    // this will update Meteor.user()
    Accounts.connection.setUserId(result.userId);

    // set the login token so fast-render will work
    Meteor._localStorage.setItem(loginTokenKey, result.token);
    Meteor._localStorage.setItem(loginTokenExpiresKey, result.tokenExpires);

    if (callback)
      callback.apply(this, arguments);
  });
};
