Profile.forcePublic = new ReactiveVar();

Template.profileBanner.helpers({
  isLoggedIn: function() {
    if (Meteor.userId())
      return true;
    else
      return false;
  },
  isPrivate: function () {
    return Meteor.userId() && !Profile.forcePublic.get();
  },
  isMyProfile: Profile.isMyProfile,
  isMyProfileEditable: function() {
    return (Blaze.getData().isMyProfile && Blaze.getData().isPrivate)
  },   
  isFollowing: function (){
    return Profile.isFollowing(Profile.currentUser());
  }
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
    Profile.forcePublic.set(true);
  },
  'click .private': function () {
    Profile.forcePublic.set(false);
  },
  'click .status-drop': function (e) {
    var status = e.target.innerText
    Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.status': status }});
  }
});
