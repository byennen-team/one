Meteor.publishComposite('followers', function (userId) {
  if (!this.userId) return false;

  check(userId, String);

  return {
    find: function () {
      return Followers.find({userId: userId});
    },
    children: [
      {
        find: function (follower) {
          return Meteor.users.find({_id: {$in: follower.followerUserIds}});
        }
      }
    ]
  }
});

Meteor.publishComposite('following', function (userId) {
  if (!this.userId) return false;

  userId = userId || this.userId;
  check(userId, String);

  return {
    find: function () {
      return Following.find({userId: userId});
    },
    children: [
      {
        find: function (following) {
          return Meteor.users.find({_id: {$in: following.followingUserIds}});
        }
      }
    ]
  }
});

Meteor.methods({
  followUser: function (userIdToFollow) {
    if (!this.userId) return;

    check(userIdToFollow, String);

    var followers = Followers.findOne({userId: userIdToFollow});
    if (!followers) {
      Followers.insert({userId: userIdToFollow, followerUserIds: [this.userId]});
    } else if (!_.contains(followers.followerUserIds, this.userId)) {
      Followers.update(followers._id, {$push: {followerUserIds: this.userId}});
    }

    var following = Following.findOne({userId: this.userId});
    if (!following) {
      Following.insert({userId: this.userId, followingUserIds: [userIdToFollow]});
      return;
    }

    if (!_.contains(following.followingUserIds, userIdToFollow)) {
      Following.update(following._id, {$push: {followingUserIds: userIdToFollow}});
    }
  },
  unfollowUser: function (userIdToUnfollow) {
    check(userIdToUnfollow, String);

    if (!this.userId) return;

    var followers = Followers.findOne({userId: userIdToUnfollow});
    if (followers) {
      Followers.update(followers._id, {$pull: {followerUserIds: this.userId}});
    }

    var following = Following.findOne({userId: this.userId});
    if (following) {
      Following.update(following._id, {$pull: {followingUserIds: userIdToUnfollow}});
    }
  }
});