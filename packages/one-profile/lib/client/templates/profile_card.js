Template.profileCard.events({
  'click .follow': function () {
    Meteor.call('followUser', Blaze.getData()._id);
  },
  'click .unfollow': function () {
    var userToUnfollow = Blaze.getData();
    Meteor.call('unfollowUser', userToUnfollow._id);
  },
  'click .card': function () {
    var user = Meteor.users.findOne({_id: this._id});
    Router.go(Routes.PROFILE, {slug: user.slug});
  }
});

Template.profileCard.helpers({
  isMyProfile: Profile.isMyProfile,

  isFollowing: Profile.isFollowing
});
