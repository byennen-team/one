/* globals Rooms: true */
Meteor.publish('room', function (roomId) {
  check(roomId, String);

  if(! this.userId)
    throw new Meteor.Error(401, "You are not logged in");

  return Rooms.findOne(roomId);
});

Meteor.publish('rooms', function() {
  if(! this.userId)
    throw new Meteor.Error(401, "You are not logged in");

  return Rooms.find({
    participants: this.userId
  });
});
Meteor.methods({
  createRoom: function(context) {
    check(context, {
      participants: [String],
      roomType: Match.Optional(String),
      roomName: Match.Optional(String),
      roomStatus: Match.Optional(String)
    });

    if(! this.userId)
      throw new Meteor.Error(401, "You are not logged in!");

    if(context.roomType &&
        context.roomType === 'office' &&
        this.userId) //TODO: check if admin
      throw new Meteor.Error(403,
        "You are not allowed to create Office channels!");

    context.dateCreated = new Date();
    context.ownerId = this.userId;

    Rooms.insert(context, function(e,r) {
      return(e,r);
    });
  },
  deleteRoom: function(roomId) {
    check(roomId, String);
    //only admins and owners can delete rooms?

    if(! this.userId)
      throw new Meteor.Error(401, "You are not logged in!");

    var room = Rooms.findOne(roomId);

    if (!room)
      throw new Meteor.Error(404, "Room not found!");

    if(this.userId !== room.ownerId) //TODO: check if admin or owner
      throw new Meteor.Error(403,
        "You are not allowed to delete this room!");

    Rooms.remove({
      _id: roomId
    }, function(e, r){
      return (e, r);
    });
  },
  editRoom: function(roomId, context) {
    check(roomId, String);
    check(context, {
      roomType: Match.Optional(String),
      roomName: Match.Optional(String),
      roomStatus: Match.Optional(String)
    });
    //only admins and owners can delete rooms?

    if(! this.userId)
      throw new Meteor.Error(401, "You are not logged in!");

    var room = Rooms.findOne(roomId);

    if (!room)
      throw new Meteor.Error(404, "Room not found!");

    if(this.userId !== room.ownerId) //TODO: check if admin or owner
      throw new Meteor.Error(403,
        "You are not allowed to edit this room!");

    Rooms.update({
      _id: roomId
    },{
      $set: context
    }, function(e, r){
      return (e, r);
    });
  },
  addUserToRoom: function(roomId, userId) {
    check(roomId, String);
    check(userId, String);

    if(! this.userId)
      throw new Meteor.Error(401, "You are not logged in!");

    var room = Rooms.findOne(roomId);

    if (!room)
      throw new Meteor.Error(404, "Room not found!");

    if (this.userId !== userId || !this.userId) //TODO: add admin check
      throw new Meteor.Error(403,
        "You can only add yourself to a room if you are not an admin");

    if (this.userId !== userId) {
      var user = Meteor.users.findOne(userId);

      if (!user)
        throw new Meteor.Error(404, "User does not exist!");
    }

    var participants = {
      participantId: userId,
      dateJoined: new Date()
    };

    Rooms.update({
      _id: roomId,
    }, {
      $addToSet: {
        participants: participants
      }
    }, function(e,r) {
      return (e, r);
    });
  },
  removeUserFromRoom: function(roomId, userId) {
    check(roomId, String);
    check(userId, String);

    if(! this.userId)
      throw new Meteor.Error(401, "You are not logged in!");

    var room = Rooms.findOne(roomId);

    if (!room)
      throw new Meteor.Error(404, "Room not found!");

    if (! _.find(room.participants, function(item) {
      return item.participantId === userId;
      }))
      throw new Meteor.Error(404, "User is not in that room!");

    if (this.userId !== userId || !this.userId) //TODO: add admin check
      throw new Meteor.Error(403,
        "You can only remove yourself from a room if you are not an admin");

    if (this.userId !== userId) {
      var user = Meteor.users.findOne(userId);

      if (!user)
        throw new Meteor.Error(404, "User does not exist!");
    }

    Rooms.update({
      _id: roomId,
    }, {
      $pull: {
        participants: {
          participantId: userId
        }
      }
    }, {
      multi: true
    }, function(e,r) {
      return (e, r);
    });
  }
});