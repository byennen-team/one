/* globals Messages: true, Rooms: true */
Template.messageBoard.events({

});
Template.messageBoard.created = function() {
  this.autorun(function () {
    if(Session.get('openRoomId')) {
      return Meteor.subscribe('roomData', Session.get('openRoomId'));
    }
    });

  $("#communication-message-board-sleeve")
    .mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "inside"
  });
};
Template.communicationMessageBoardSleeve.rendered = function() {
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  var board = $("#communication-message-board-sleeve");
  board.mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "inside"
  });
  Meteor.setTimeout(function() {
    board.mCustomScrollbar("scrollTo","bottom");
  },500);
};

Template.messageBoard.helpers({
  room: function() {
    return Rooms.findOne(Session.get('openRoomId'));
  }
});

Template.communicationMessageBoardSleeve.helpers({
  messages: function() {
    return Messages.find({
      roomId: Session.get('openRoomId')
    });
  },
  isSimpleMessage: function() {
    return (this.messageType === 'message' || ! this.messageType);
  },
  isPostMessage: function() {
    return (this.messageType === 'post');
  },
  isFirstUnread: function(roomId) {
    var room = Rooms.findOne(roomId);
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
      roomId: roomId,
      dateCreated: {
        $gt: latestTimestamp
      }
    },{
      sort: {
        dateCreated: 1
      },
      limit: 1
    });
    return (latestUnreadMessage && latestUnreadMessage._id === this._id);
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

Template.postMessage.helpers({
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
};