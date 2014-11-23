Meteor.publish('followers', function (userId) {
  if (!this.userId) return;

  return Followers.find({userId: userId});
});

Meteor.publish('following', function () {
  return Following.find({userId: this.userId});
});

Meteor.methods({
  followUser: function (userIdToFollow) {
    if (!this.userId) return;

    var followers = Followers.findOne({userId: userIdToFollow});
    if (!followers) {
      Followers.insert({userId: userIdToFollow, followerUserIds: [this.userId]});
    } else if (!_.contains(followers.followerUserIds, userIdToFollow)) {
      followers.followerUserIds.push(this.userId);
      Following.update({userId: userIdToFollow}, followers);
    }

    var following = Following.findOne({userId: this.userId});
    if (!following) {
      Following.insert({userId: this.userId, followingUserIds: [userIdToFollow]});
      return;
    }

    if (!_.contains(following.followingUserIds, userIdToFollow)) {
      following.followingUserIds.push(userIdToFollow);
      Following.update({userId: this.userId}, following);
    }
  }
});