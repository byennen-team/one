Template.mobileNavbar.helpers({

// TODO: Returns last page link/route (for back button)
  last: function () {
    return '#';
  },

  isLoggedIn: function() {
    if (Meteor.userId())
      return true;
    else
      return false;
  },

  // isMyProfile: Profile.isMyProfile,
  // isMyProfileEditable: function() {
  //   return (Blaze.getData().isMyProfile && Blaze.getData().isPrivate);
  // },

  isFollowing: function (){
    return Profile.isFollowing(Profile.currentUser());
  }
  
});

Template.mobileNavbar.events({
  'click .follow': function () {
    var userToFollow = Profile.currentUser();
    Meteor.call('followUser', userToFollow._id);
  },
  'click .un-follow': function () {
    var userToUnfollow = Profile.currentUser();
    Meteor.call('unfollowUser', userToUnfollow._id);
  }
});