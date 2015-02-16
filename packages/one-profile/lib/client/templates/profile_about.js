Template.profileAbout.helpers({
  teamMembers: function() {
    var user = Profile.currentUser();
    if(user && user.teamMembers)
      return Meteor.users.find({
        _id: {
          $in: user.teamMembers
        }
      });
  },
  isMyProfile: function() {
    var user = Meteor.user();
    return (user && Profile.currentUser()._id === user._id);
  }
});