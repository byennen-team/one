/* globals Rooms: true, RoomsController: true */
Rooms = new Meteor.Collection('rooms');

var participantsSchema = new SimpleSchema({
  participantId: { type: String },
  dateJoined: { type: Date, defaultValue: new Date() },
  lastReadTimestamp: { type: Date, optional: true }
});

Rooms.simpleSchema = new SimpleSchema({
  roomName: { type: String, optional: true },
  ownerId: { type: String },
  participants: { type: participantsSchema },
  dateCreated: { type: Date },
  roomType: { type: String, optional: true},
  roomStatus: { type: String, defaultValue: 'private'}
});

RoomsController = {};

RoomsController.createRoom = function(participants, roomType, roomName) {
  Meteor.call('createRoom', {
    participants: participants,
    roomType: roomType,
    roomName: roomName
  }, function(e,r) {
    if (e)
      console.log(e);

    console.log(r);
  });

};

RoomsController.deleteRoom = function(roomId) {
  Meteor.call('deleteRoom', roomId, function(e,r) {
    if (e)
      console.log(e);

    console.log(r);
  });
};

RoomsController.editRoom = function(roomId, context) {
  Meteor.call('editRoom', roomId, context, function(e,r) {
    if (e)
      console.log(e);

    console.log(r);
  });
};

RoomsController.addUserToRoom = function(roomId, userId) {
  Meteor.call('addUserToRoom', roomId, userId, function(e,r) {
    if (e)
      console.log(e);

    console.log(r);
  });
};

RoomsController.removeUserFromRoom = function(roomId, userId) {
  Meteor.call('removeUserFromRoom', roomId, userId, function(e,r) {
    if (e)
      console.log(e);

    console.log(r);
  });
};

RoomsController.addSimpleMessageToRoom = function(roomId, message) {
  Meteor.call('addSimpleMessageToRoom', roomId, message, function(e,r) {
    if (e)
      console.log(e);

    console.log(r);
  });
};
RoomsController.deleteMessage = function(messageId) {
  Meteor.call('deleteMessage', messageId, function(e,r) {
    if (e)
      console.log(e);

    console.log(r);
  });
};
RoomsController.editSimpleMessage = function(messageId, message) {
  Meteor.call('editSimpleMessage', messageId, message, function(e,r) {
    if (e)
      console.log(e);

    console.log(r);
  });
};
