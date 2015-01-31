Template.messageBoard.events({



});

Template.messageBoard.helpers({
  room: function() {
    return Rooms.findOne(Session.get('openRoomId'));
  },
  messages: function() {
    return Messages.find({
      roomId: Session.get('openRoomId')
    });
  },
  isSimpleMessage: function() {
    return (this.messageType === 'message' || ! this.messageType);
  }
});

Template.message.helpers({
  isUserClass: function() {
    return (this.creatorId === Meteor.userId())?'user':'';
  },
  user: function() {
    return Meteor.users.findOne(this.creatorId);
  },
  date: function(dateToFormat) {
    return moment(dateToFormat).calendar();
  },
  status: function (status) {
    if (status) {
      switch (status.toUpperCase()) {
        case 'MOBILE':
          return 'mobile';
        case 'OUT OF OFFICE':
          return 'inactive';
        case 'IN THE OFFICE':
          return 'active';
      }
    } else {
      return "inactive";
    }
  }
})