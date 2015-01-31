Template.communicationSidebarRooms.rendered = function(){

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  // Repeated to play nice with plugin
  $(".communication-sidebar-sleeve").mCustomScrollbar({
	  	theme:"one-light",
	  	scrollbarPosition: "inside"
  });

};

Template.communicationSidebarRoomsFill.helpers({
  rooms: function() {
    return Rooms.find({
      roomType: 'room'
    });
  },
  unreadMessages: function() {
    var currentParticipant = _.find(this.participants, function(item) {
      return (item.participantId === Meteor.userId());
    });

    return Messages.find({
      roomId: this._id,
      creatorId: Meteor.userId(),
      dateCreated: {
        $gt: currentParticipant.lastReadTimestamp
      }
    }).count();
  }
});