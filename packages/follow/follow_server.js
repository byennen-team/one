Meteor.publishComposite('followers', function (userId) {
  return {
    find: function () {
      if (!userId || !this.userId) return;

      check(userId, String);

      return Followers.find({userId: userId});
    },
    children: [
      {
        find: function (follower) {
          return Meteor.users.find({_id: {$in: follower.followerUserIds}});
        }
      }
    ]
  };
});

Meteor.publishComposite('following', function (userId) {
  return {
    find: function () {
      userId = userId || this.userId;

      if (!userId || !this.userId) return;

      check(userId, String);

      return Following.find({userId: userId});
    },
    children: [
      {
        find: function (following) {
          return Meteor.users.find({_id: {$in: following.followingUserIds}});
        }
      }
    ]
  };
});

Meteor.methods({
  followUser: function (userIdToFollow) {
    if (!this.userId) return;

    var currentUser = Meteor.users.findOne(this.userId);

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
      //notify
      Notify.addNotification(userIdToFollow,{
        message: Notify.generateMessageText(Notify.messages.FOLLOWED_BY_USER.message,
          [currentUser.profile.firstName + ' ' + currentUser.profile.lastName]),
        title: Notify.messages.FOLLOWED_BY_USER.title,
        link: '/' + currentUser.slug
      });
      return;
    }

    if (!_.contains(following.followingUserIds, userIdToFollow)) {
      Following.update(following._id, {$push: {followingUserIds: userIdToFollow}});
      Notify.addNotification(userIdToFollow,{
        message: Notify.generateMessageText(Notify.messages.FOLLOWED_BY_USER.message,
          [currentUser.profile.firstName + ' ' + currentUser.profile.lastName]),
        title: Notify.messages.FOLLOWED_BY_USER.title,
        link: '/' + currentUser.slug
      });
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
