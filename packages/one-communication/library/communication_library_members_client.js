Template.libraryMembers.rendered = function(){
  $(".library-board-sleeve").mCustomScrollbar({
  	theme:"one-light",
  	scrollbarPosition: "inside"
  });
};

Template.libraryMembers.events({

	'click #communication-library-invite': function(){
		$('#communication-library-invite-input').focus();
		$('#communication-library-invite-directory').css('opacity', '1');
	},

	'blur #communication-library-invite-input': function(){
		$('#communication-library-invite-directory').css('opacity', '0');
	},
  'click #communication-library-invite-directory': function() {
    Session.set('teamModalPurpose','editTeam');
    var room = Rooms.findOne(Session.get('openRoomId'));
    var members = _.pluck(room.participants, 'participantId');
    Session.set("teamMembers", members);
  }

});

Template.libraryMembers.helpers({
  members: function() {
    var room = Rooms.findOne(Session.get('openRoomId'));

    if(room) {
      var participantsIds = _.pluck(room.participants,'participantId');

      return Meteor.users.find({
        _id: {
          $in: participantsIds
        }
      })
    } else return [];
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