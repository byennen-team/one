Template.messageWidget.rendered = function () {
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  var sleeve = $( ".messageWidgetSleeve" );
  sleeve.mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "inside"
  });
  sleeve.mCustomScrollbar("scrollTo","bottom");
}

Template.messageWidget.helpers({
// TODO: Return the channel type. String (company, message, rooms)
//    (to be used as class name)
  channelType: function () {
    return 'company';
    // return 'message';
    // return 'rooms';
  },

// TODO: Return the descriptive channel type. String
//    (company channels, direct messaging, rooms)
  channelType: function () {
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
  channelType: function () {
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
    return 'Updated Listing Agreement now in the Company Docs. Happy New Year everyone!';
  },

// TODO: Return true if the message has an attachment, false if it doesn't.
  messageText: function () {
    return true;
    // return false;
  },

// TODO: Return's url of attachment thumbnail. String
  attachmentURL: function () {
    return '/images/com-hub-main/doc.jpg';
  },

// TODO: Return's attachment file name. String
  attachmentURL: function () {
    return 'Leasing Agreement.pdf';
  },

// TODO: Return's attachment file size. String. Include kb/mb.
  attachmentSize: function () {
    return '380kb';
  }

});

Template.messageWidget.events({

// TODO: Open channel for the conversation
  // Opens channel of message clickec
  'click .view-chat': function () {

  }

});