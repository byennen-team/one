/* globals Rooms: true, Messages: true, RoomsController: true */
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
  roomStatus: { type: String, defaultValue: 'private'},
  officeNo: { type: Number, optional: true }
});

RoomsController = {};

RoomsController.createRoom = function(context) {
  Meteor.call('createRoom', context, function(e,r) {
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

RoomsController.addSimpleMessageToRoom = function(roomId, message, callback) {
  Meteor.call('addSimpleMessageToRoom', roomId, message, function(e,r) {
    if (e)
      console.log(e);

  //this is needed to capture new messages in freshly created or joined rooms
  //might be a resource killer, but will have to check how it works with many
  //users.
  Meteor.subscribe('unreadMessages');

  if(callback)
    callback(e,r);
  });
};

RoomsController.addAttachmentMessageToRoom = function(roomId, documentId, callback) {
  Meteor.call('addAttachmentMessageToRoom', roomId, documentId, function(e,r) {
    if (e)
      console.log(e);

  //this is needed to capture new messages in freshly created or joined rooms
  //might be a resource killer, but will have to check how it works with many
  //users.
  Meteor.subscribe('unreadMessages');

  if(callback)
    callback(e,r);
  });
};

// context.postContent: String, context.title: String,
// context.fileId: String optional
RoomsController.addPostMessageToRoom = function(roomId, context, callback) {
  Meteor.call('addPostMessageToRoom',
    roomId, context, function(e,r) {
    if (e)
      console.log(e);

  //this is needed to capture new messages in freshly created or joined rooms
  //might be a resource killer, but will have to check how it works with many
  //users.
  Meteor.subscribe('unreadMessages');

  if(callback)
    callback(e,r);
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

RoomsController.getUnreadMessagesCount = function(roomId) {
  var room = Rooms.findOne(roomId);

  if(! room)
    throw new Meteor.Error(404, "Room not found");

  var currentParticipant = _.find(room.participants, function(item) {
      return (item.participantId === Meteor.userId());
    });

    var query = {};
    query.roomId = room._id;

    if(currentParticipant.lastReadTimestamp)
      query.dateCreated = { $gt: currentParticipant.lastReadTimestamp };

    return Messages.find(query).count();
};

RoomsController.getRoomsWithUnreadMessages = function() {
  var rooms = Rooms.find().fetch();
  var roomsIds = [];

  _.each(rooms, function(room) {
    if(! room.participants)
      return false; //TODO: add checking for public channels too

    var currentParticipant = _.find(room.participants, function(item) {
      return (item.participantId === Meteor.userId());
    });

    var query = {};
    query.roomId = room._id;

    if(currentParticipant && currentParticipant.lastReadTimestamp)
      query.dateCreated = { $gt: currentParticipant.lastReadTimestamp };

    var roomUnreadMessages = Messages.find(query).count();

    if(roomUnreadMessages > 0)
      roomsIds.push(room._id);

  });
  console.log(roomsIds)

  return Rooms.find({
    _id: {
      $in: roomsIds
    }
  });

};

RoomsController.updateTimestamp = function(roomId) {
  Meteor.call('updateTimestamp', roomId, function(e, r) {
    if(e)
      console.log(e);

    console.log(r);
  });
};

RoomsController.createOrGetDMRoom = function(userId, callback) {
  var ifRoomExists = Rooms.findOne({
      roomType: 'dm',
      $and: [
        {'participants.participantId': Meteor.userId()},
        {'participants.participantId': userId}
      ]
    });

  if (ifRoomExists) {
    callback(null, ifRoomExists._id);
    return;
  }

  Meteor.call('createDMRoom', userId, function(e, r) {
    if(callback)
      callback(e,r);
    });
};

RoomsController.adjustParticipantsInRoom = function(
  roomId, participantsArray
  ) {
  Meteor.call('adjustParticipantsInRoom', roomId, participantsArray,
    function(e, r) {
      if(e)
        console.log(e);

      console.log(r);
    });
};
