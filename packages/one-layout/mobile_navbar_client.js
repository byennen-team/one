Template.mobileNavbar.rendered = function () {
  $('.mobile-menu-link').leftNav();
};

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
  },

  dashboard: function() {
    var page = Router.current().route.getName();
    if( page === 'dashboard' ){
      return true;
    }
  },

  page: function() {
    var page = Router.current().route.getName();
    return page;
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