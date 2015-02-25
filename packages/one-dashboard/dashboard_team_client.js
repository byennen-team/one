Template.teamMembers.helpers({

  teamMembers: function() {
    if(Meteor.user() && Meteor.user().teamMembers)
      return Meteor.users.find({
        _id: {
          $in: Meteor.user().teamMembers
        }
      });
  },

  unreadMessages: function() {
    //getting dm room if it exists
    var dm = Rooms.findOne({
      roomType: 'dm',
      $and: [
      { 'participants.participantId': this._id },
      { 'participants.participantId': Meteor.userId() }
      ]
    });

    if(dm)
      return RoomsController.getUnreadMessagesCount(dm._id);
    else
      return false;
  }
  
}); 