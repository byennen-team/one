Accounts.onCreateUser(function(options, user){
  var userProperties = {
    profile: options.profile || {},
    isInvited: false,
    isAdmin: false,
  };
  user = _.extend(user, userProperties);

  // if this is the first user ever, make them an admin
  if (!Meteor.users.find().count() )
    user.isAdmin = true;

  return user;
});
