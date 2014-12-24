Profile = {};

Profile.currentSlug = function () {
  return Router.current().params.slug;
};

Profile.currentUser = function () {
  return Meteor.users.findOne({slug: Profile.currentSlug()});
};

Profile.isMyProfile = function () {
  var user = Meteor.user();
  return user && user._id === Blaze.getData()._id;
};

Profile.isFollowing = function (user) {
  user = user || Blaze.getData();

  var me = Meteor.user();
  if (!me) return false;

  var following = Following.findOne({userId: me._id});
  return following && _.indexOf(following.followingUserIds, user._id) > -1;
};
