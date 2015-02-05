Template.channelWidget.rendered = function () {
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  var sleeve = $( ".conversation" );
  sleeve.mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "inside",
      autoHideScrollbar: true
  });
  // Delay gives the plugin a change to load fully
  setTimeout(function(){
    sleeve.mCustomScrollbar( "scrollTo", "bottom" );
  }, 200);
};

Template.channelWidget.helpers({
  unreadRooms: function() {
    //getting all unread messages first
    return RoomsController.getRoomsWithUnreadMessages();
  },
// TODO: Return the channel type. String (company, message, rooms)
//    (to be used as class name)
  channelType: function () {
    switch (this.roomType) {
      case 'office':
        return 'company';
        break;
      case 'company':
        return 'company';
        break;
      case 'dm':
        return 'message';
        break;
      default:
        return 'rooms';
      }
  },

// TODO: Return the descriptive channel type. String
//    (company channels, direct messaging, rooms)
  channelTypeLong: function () {
    switch (this.roomType) {
      case 'office':
        return 'company channels';
        break;
      case 'company':
        return 'company channels';
        break;
      case 'dm':
        return 'direct messaging';
        break;
      default:
        return 'rooms';
      }
  },

// TODO: Return the channel name. String. Title case
//    (Events, Listings, Dottie Herman, 575 Madison Ave)
  channelName: function () {
    if(this.roomType === 'dm') {
      var dmWith = _.find(this.participants, function(item) {
        return item.participantId != Meteor.userId();
      })

      var user = Meteor.users.findOne(dmWith.participantId);
    }
   switch (this.roomType) {
    case 'dm':
      return user.profile.firstName + ' ' + user.profile.lastName;
      break;
    default:
      return this.roomName;
    };
  },

// TODO: Return the number of unread messages
  unread: function () {
    return RoomsController.getUnreadMessagesCount(this._id);;
  },
  messages: function() {
    return Messages.find({
      roomId: this._id
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
  },
// TODO: return Message Author's status. String.
  status: function () {
    return 'active';
    // return 'inactive';
    // return 'mobile';
  },

// TODO: Return Message Author's avatar url. String. At least 55x55px
  avatarURL: function () {
    return 'images/com-hub-main/joy.jpg';
  },

// TODO: Return Message Author's name. String.
  authorName: function () {
    return 'Joy Avery';
  },

// TODO: Return Message's timestamp. String.
  messageTime: function () {
    return '8:45am';
  },

// TODO: Return Message's text. String.
  messageText: function () {
    return 'Updated Listing Agreement now in the Company Docs. Happy New Year!';
  },

// TODO: Return true if the message has an attachment, false if it doesn't.
  hasAttachment: function () {
    return true;
    // return false;
  },

// TODO: Return's url of attachment thumbnail. String
  attachmentURL: function () {
    return '/images/com-hub-main/doc.jpg';
  },

// TODO: Return's attachment file name. String
  attachmentName: function () {
    return 'Leasing Agreement.pdf';
  },

// TODO: Return's attachment file size. String. Include kb/mb.
  attachmentSize: function () {
    return '380kb';
  }

});

Template.channelWidget.events({

// TODO: Open channel for the conversation
  // Opens channel of message clickec
  'click .view-chat': function () {
    $('#sidebar-scroll-target').velocity("scroll",600);
    $.Velocity.hook($('#communication-main'), "width", "100%");
    $.Velocity.hook($('#communication-message-board'), "width", "60%");
    $.Velocity.hook($('#communication-task-board'), "width", "0");
    $.Velocity.hook($('#communication-library-board'), "width", "15.5%");
    // force scrollbar on sidebar
    var currentHeight = $(window).height();
    $('.communication-sidebar-sleeve').css({
      'height': currentHeight - 130 + 'px',
      'position': 'fixed',
      'top': '120px',
      'width': '24%'
    });
    // lock scroll position, but retain settings for later
    var scrollPosition = [
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft,
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    ];
    var body = $('body');
    body.data('scroll-position', scrollPosition);
    body.data('previous-overflow', body.css('overflow'));
    body.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
  }

});