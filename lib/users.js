getProfileUrl = function(user) {
  return Meteor.absoluteUrl()+'users/' + slugify(getUserName(user));
};
