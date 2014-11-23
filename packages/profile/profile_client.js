var getSlug = function () {
  return Router.current().params.slug;
};

var getUser = function () {
  return Meteor.users.findOne({slug: getSlug()});
};

var followingUser = function () {
  var following = Following.findOne();
  var user = getUser();
  return following || _.contains(following.followingUserIds, user._id);
};

Template.profile.events({
  'click .follow': function () {
    var userToFollow = getUser();
    Meteor.call('followUser', userToFollow._id);
  }
});

Template.profile.helpers({
  followingUser: followingUser,

  followers: function () {
    var user = getUser();

    var followers = Followers.findOne({userId: user._id});
    var followerUserIds = followers && followers.followerUserIds;

    if (followerUserIds) return Meteor.users.find({_id: {$in: followerUserIds}})
  },

  isPublic: function () {
    return !Meteor.userId();
  },
  isMyProfile: function () {
    var user = Meteor.user();
    return user && user.slug === getSlug();
  }
});