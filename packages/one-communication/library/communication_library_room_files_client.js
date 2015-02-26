/* globals Rooms: false */

Template.roomFiles.rendered = function () {
  $( ".room-files-sleeve" ).mCustomScrollbar({
    theme: "one-light",
    scrollbarPosition: "inside"
  });
};

Template.roomFiles.helpers({

  currentRoom: function () {
    return Rooms.findOne(Session.get('openRoomId'));
  },

  documentsListOptions: function () {
    var room = Rooms.findOne(Session.get('openRoomId'));

    return DocumentSubscriptions.getRoomDocumentsListOptions(room);
  }

});
