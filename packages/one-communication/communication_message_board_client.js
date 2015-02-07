/* globals Messages: true, Rooms: true */
Template.messageBoard.events({

});
Template.messageBoard.created = function() {
  Session.set('messageLimit',20);
  this.autorun(function () {
    var openRoomId = Session.get('openRoomId');
    if (openRoomId) {
      return Meteor.subscribe('roomData', openRoomId,
        Session.get('messageLimit'));
    }
    });


};
Template.communicationMessageBoardSleeve.rendered = function() {
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  var board = $("#communication-message-board-sleeve");
  board.mCustomScrollbar({
      callbacks: {
        onTotalScrollBack: function() {
          var loadedMessages = Messages.find({
            roomId: Session.get('openRoomId'),
            'messagePayload.draft': {
              $ne: true
            }
          },{
            sort: {
              dateCreated: 1
            }
          }).count();

          if(loadedMessages <= Session.get("messageLimit")) {
            var newLimit = Session.get("messageLimit") + 20;
            Session.set("messageLimit", newLimit);
          }
        }
      },
      onTotalScrollOffset: 100,
      alwaysTriggerOffsets: false,
      theme:"one-dark",
      scrollbarPosition: "inside"
  });
  Meteor.setTimeout(function() {
    board.mCustomScrollbar("scrollTo","bottom",{
      scrollInertia: 0
    });
  },500);
};

Template.messageBoard.helpers({
  room: function() {
    return Rooms.findOne(Session.get('openRoomId'));
  },
  isDM: function() {
    return this.roomType === 'dm';
  },
  partnerName: function() {
    var room = Rooms.findOne(Session.get('openRoomId'));
    var participant = _.find(room.participants, function(item){
      return (item.participantId !== Meteor.userId());
    });
    var partner = Meteor.users.findOne(participant.participantId);
    return partner.profile.firstName + ' ' + partner.profile.lastName;
  }
});

Template.communicationMessageBoardSleeve.helpers({
  messages: function() {
    return Messages.find({
      roomId: Session.get('openRoomId'),
      'messagePayload.draft': {
        $ne: true
      }
    },{
      sort: {
        dateCreated: 1
      }
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
      'messagePayload.draft': {
        $ne: true
      },
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

Template.postMessage.events({
  'click .readMore': function() {
    if(Template.instance().expanded.get()) {
      //compressing
      Template.instance().expanded.set(false);
    } else {
      //expanding
      Template.instance().expanded.set(true);
    }
  }
});

Template.postMessage.helpers({
  anchorText: function() {
    if(Template.instance().expanded.get()) {
      return '...<span class="blue-text">collapse <i class="fa ' +
      'fa-arrow-circle-left"></i></span>';
    } else {
      return '...<span class="blue-text">read <i class="fa ' +
      'fa-arrow-circle-right"></i></span>';
    }

  },
  expandMessage: function(text) {
    if(Template.instance().expanded.get()) {
      return text;
    } else {
      return $(text).text().slice(0,50);
    }
  },
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

Template.postMessage.created = function() {
  this.expanded = new ReactiveVar(false);
};

Template.message.rendered = function() {
  if ($("#communication-message-board-sleeve").scrollTop + 100 >=
    $("#communication-message-board-sleeve").height()) {
    $("#communication-message-board-sleeve, .conversation}")
    .mCustomScrollbar("scrollTo","bottom");
  }
};
Template.postMessage.rendered = function() {
  if ($("#communication-message-board-sleeve").scrollTop + 100 >=
    $("#communication-message-board-sleeve").height()) {
    $("#communication-message-board-sleeve, .conversation}")
    .mCustomScrollbar("scrollTo","bottom");
  }
};