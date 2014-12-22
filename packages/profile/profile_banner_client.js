Template.profileBanner.helpers({
  loggedIn: Meteor.userId
});

Template.profileBanner.events({
  'click .follow': function () {
    var userToFollow = Profile.currentUser();
    Meteor.call('followUser', userToFollow._id);
  },
  'click .un-follow': function () {
    var userToUnfollow = Profile.currentUser();
    Meteor.call('unfollowUser', userToUnfollow._id);
  },
  'click .public': function () {
    forcePublic.set(true);
  },
  'click .private': function () {
    forcePublic.set(false);
  },
  'click .status-drop': function (e) {
    var status = e.target.innerText
    Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.status': status }});
  }
});

Template.profileBanner.helpers({
  isFollowing: function (){
    return Profile.isFollowing(Profile.currentUser());
  },

  isLoggedIn: Meteor.userId
});
