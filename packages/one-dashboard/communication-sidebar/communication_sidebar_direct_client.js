Template.communicationSidebarDirect.rendered = function(){

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  // Repeated to play nice with plugin
  $(".communication-sidebar-sleeve").mCustomScrollbar({
	  	theme:"one-light",
	  	scrollbarPosition: "inside"
  });

};

Template.communicationSidebarDirectFill.created = function() {
  Session.set('roomOpenId', false);
  Tracker.autorun(function() {
    Meteor.subscribe('room', Session.get('roomOpenId'));
  });
};

Template.communicationSidebarDirectFill.helpers({
  rooms: function() {
    return Rooms.find({
      roomType: 'dm'
    });
  },
  partner: function() {
    var dmWith = _.find(this.participants, function(item) {
      return item.participantId != Meteor.userId();
    })

    return Meteor.users.findOne(dmWith.participantId);
  },
  unreadMessages: function() {
    var roomCount = RoomsController.getUnreadMessagesCount(this._id);
    return (roomCount > 0) ? roomCount : false;
  }
});