Template.profileNav.helpers({
  followingCount: function () {
    var user = Profile.currentUser();

    var following = Following.findOne({userId: user._id});
    var followingUserIds = following && following.followingUserIds;

    return followingUserIds && Meteor.users.find({_id: {$in: followingUserIds}}).count();
  },
  followers: function () {
    var user = Profile.currentUser();

    var followers = Followers.findOne({userId: user._id});
    var followerUserIds = followers && followers.followerUserIds;

    return followerUserIds && Meteor.users.find({_id: {$in: followerUserIds}}).count();
  }
});
