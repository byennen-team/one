Template.profileFollowers.helpers({
  followers: function () {
    var user = Profile.currentUser();

    var followers = Followers.findOne({userId: user._id});
    var followerUserIds = followers && followers.followerUserIds;

    return followerUserIds && Meteor.users.find({_id: {$in: followerUserIds}});
  }
});
