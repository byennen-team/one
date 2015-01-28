Meteor.methods({
  'addTeamMember': function(userId) {
    check(userId, String);
    if(! this.userId)
      throw new Meteor.Error("You are not logged in");

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
    if(! this.userId)
      throw new Meteor.Error("You are not logged in");

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