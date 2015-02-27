Template.chat.created = function() {
  Session.set('messageLimit',20);
  this.autorun(function () {
    var openRoomId = Session.get('openRoomId');
    if (openRoomId) {
      return Meteor.subscribe('roomData', openRoomId,
        Session.get('messageLimit'));
    }
    });
};

Template.chat.helpers({
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