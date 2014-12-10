Template.profileCard.events({
  'click .follow': function () {
    Meteor.call('followUser', Blaze.getData()._id);
  },
  'click .unfollow': function () {
    var userToUnfollow = Blaze.getData();
    Meteor.call('unfollowUser', Blaze.getData()._id);
  }
});

Template.profileCard.helpers({
  isMyProfile: Profile.isMyProfile,

  isFollowing: Profile.isFollowing
});