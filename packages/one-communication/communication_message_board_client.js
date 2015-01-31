Template.messageBoard.events({



});

Template.messageBoard.rendered = function() {
  $("#communication-message-board-sleeve")
    .mCustomScrollbar("scrollTo","bottom");
  };

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
  },
  isFirstUnread: function(room) {
    var latestTimestamp = null;
    var currentParticipant = _.where(room.participants,{
      participantId: Meteor.userId()
    });

    if (currentParticipant[0]) {
      latestTimestamp = currentParticipant[0].lastReadTimestamp;
    }
    if (! latestTimestamp )
      return false;

    var latestUnreadMessage = Messages.findOne({
      roomId: room._id,
      dateCreated: {
        $gt: latestTimestamp
      }
    },{
      sort: {
        dateCreated: 1
      },
      limit: 1
    });
    console.log(latestUnreadMessage);
    return (latestUnreadMessage._id === this._id);
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
});

Template.message.rendered = function() {
  $("#communication-message-board-sleeve")
    .mCustomScrollbar("scrollTo","bottom");
}