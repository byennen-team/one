/* globals Messages: true, Rooms: true */
Meteor.publish('messagesForRoom', function(roomId) {
  check(roomId, String);

  if (! this.userId)
    throw new Meteor.Error(401, "You are not logged in!");

  return Messages.find({
    roomId: roomId
  });
});

Meteor.publish('unreadMessages', function() {
  if(this.userId) {
      var rooms = Rooms.find({
        'participants.participantId': this.userId
      }).fetch();
      var messageIdArray = [];

      _.each(rooms, function(item) {
        var currentParticipant = _.where(item.participants,
          { participantId: this.userId });

        var query = {};
        query.roomId = item._id;

        if(currentParticipant.lastReadTimestamp)
          query.dateCreated = { $gt: currentParticipant.lastReadTimestamp };

        messageIdArray.push(query)
      });

      if(messageIdArray.length > 0)
        return Messages.find({
          $or: messageIdArray
        });
      else
        return [];
    }
});

Meteor.methods({
  addSimpleMessageToRoom: function(roomId, message) {
    check(roomId, String);
    check(message, String);

    if (! this.userId)
      throw new Meteor.Error(401, "You are not logged in!");

    var room = Rooms.findOne(roomId);

    if(! room)
      throw new Meteor.Error(404, "Room not found!");

    console.log(room.participants, this.userId)
    var participant = _.where(room.participants, {participantId: this.userId});
    console.log(participant)

    if(! participant)
      throw new Meteor.Error(403, "You can only post in rooms you are in");

    Messages.insert({
      roomId: roomId,
      creatorId: this.userId,
      dateCreated: new Date(),
      message: message
    }, function(e, r) {
      return(e, r);
    });
  },
  deleteMessage: function(messageId) {
    //can only delete if owner or admin
    check(messageId, String);

    if (! this.userId)
      throw new Meteor.Error(401, "You are not logged in!");

    var message = Messages.findOne(messageId);

    if(! message)
      throw new Meteor.Error(404, "Message not found!");

    if(message.ownerId !== this.userId) //TODO: allow admin
      throw new Meteor.Error(403, "You can only delete your messages");

    Messages.remove({
      _id: messageId
    }, function(e, r) {
      return(e, r);
    });

  },
  editSimpleMessage: function(messageId, messageToEdit) {
    //can only delete if owner or admin
    check(messageId, String);
    check(messageToEdit, String);

    if (! this.userId)
      throw new Meteor.Error(401, "You are not logged in!");

    var message = Messages.findOne(messageId);

    if(! message)
      throw new Meteor.Error(404, "Message not found!");

    if(message.type !== 'message')
      throw new Meteor.Error(403, "This is not a simple message!");

    if(message.ownerId !== this.userId) //TODO: allow admin
      throw new Meteor.Error(403, "You can only edit your messages");

    Messages.update({
      _id: messageId
    }, {
      $set: {
        message: messageToEdit
      }
    }, function(e, r) {
      return(e, r);
    });
  }
});