Meteor.methods({
  'addTeamMember': function(userId) {
    check(userId, String);

    Meteor.users.update({
      _id: this.userId
    },{
      $addToSet: {
        teamMembers: userId
      }
    });
  },
  'removeTeamMember': function(userId) {
    check(userId, String);

    Meteor.users.update({
      _id: this.userId
    },{
      $pull: {
        teamMembers: userId
      }
    },{
      multi: true
    });
  }
})