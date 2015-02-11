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
// TODO: Return the channel type. String (company, message, rooms)
//    (to be used as class name)
  channelType: function () {
    return 'company';
    // return 'message';
    // return 'rooms';
  },

// TODO: Return the descriptive channel type. String
//    (company channels, direct messaging, rooms)
  channelTypeLong: function () {
    return 'company channels';
    // return 'direct messaging';
    // return 'rooms';
  },

// TODO: Return the channel name. String. Title case
//    (Events, Listings, Dottie Herman, 575 Madison Ave)
  channelName: function () {
    return 'Events';
    // return 'Dottie Herman';
    // return 'Team Awesome';
  },

// TODO: Return the number of unread messages 
  unread: function () {
    return 2;
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
    $( "#transitioner-1" ).animate( { scrollTop: 400 } );
    $.Velocity.hook($('#communication-main'), "width", "100%");
    $.Velocity.hook($('#communication-message-board'), "width", "60%");
    $.Velocity.hook($('#communication-task-board'), "width", "0");
    $.Velocity.hook($('#communication-library-board'), "width", "15.75%");
    // force scrollbar on sidebar
    var currentHeight = $(window).height();
    var $sleeve = $('.communication-sidebar-sleeve');
    $sleeve.css( 'position', 'fixed' );
    $sleeve.velocity( {
      height: currentHeight - 130,
      top: 120,
      width: '24%'
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