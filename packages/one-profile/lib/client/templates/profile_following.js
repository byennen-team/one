Template.profileFollowing.helpers({
  following: function () {
    var user = Profile.currentUser();

    var following = Following.findOne({userId: user._id});
    var followingUserIds = following && following.followingUserIds;

    return followingUserIds && Meteor.users.find(
      {_id: {$in: followingUserIds}}
    );
  }
});
