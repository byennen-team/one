/* globals Messages: true, Rooms: true */

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

        messageIdArray.push(query);
      });
      var user = Meteor.users.findOne(this.userId);

      var publicRooms = Rooms.find({
        $or: [
          {
            roomType: 'office',
            officeNo: user.profile.officeId
          },
          {
            roomType: 'company'
          }
        ]
      }).fetch();

      _.each(publicRooms, function(item) {
        var query = {};
        query.roomId = item._id;
        if(user.roomsSeen) {
          var isSeen = _.find(user.roomsSeen, function(room) {
            return room.roomId === item._id;
          });

          if(isSeen)
            query.dateCreated = { $gt: isSeen.timestamp };

        }

        messageIdArray.push(query);
      });

      if(messageIdArray.length > 0)
        return Messages.find({
          'messagePayload.draft': {
            $ne: true
          },
          $or: messageIdArray
        });
      else
        this.ready();
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

    var participant = _.where(room.participants, {participantId: this.userId});

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
  addAttachmentMessageToRoom: function(roomId, message, documentId) {
    check(roomId, String);
    check(message, String);
    check(documentId, String);

    if (! this.userId)
      throw new Meteor.Error(401, "You are not logged in!");

    var room = Rooms.findOne(roomId);

    if(! room)
      throw new Meteor.Error(404, "Room not found!");

    var file = Files.findOne(documentId);

    if(! file)
      throw new Meteor.Error(404, "Document not found!");

    var participant = _.where(room.participants, {participantId: this.userId});

    if(! participant)
      throw new Meteor.Error(403, "You can only post in rooms you are in");

    Messages.insert({
      roomId: roomId,
      creatorId: this.userId,
      dateCreated: new Date(),
      message: message,
      messageType: 'attachment',
      messagePayload: {
        documentId: documentId
      }
    }, function(e, r) {
      return(e, r);
    });
  },
  addPostMessageToRoom: function(roomId, context) {
    check(roomId, String);
    check(context, {
      postContent: String,
      title: String,
      fileId: Match.Optional(String),
      draft: Match.Optional(Boolean)
    });

    if (! this.userId)
      throw new Meteor.Error(401, "You are not logged in!");

    var room = Rooms.findOne(roomId);

    if(! room)
      throw new Meteor.Error(404, "Room not found!");

    var participant = _.where(room.participants, {participantId: this.userId});

    if(! participant)
      throw new Meteor.Error(403, "You can only post in rooms you are in");

    var query = {
      roomId: roomId,
      creatorId: this.userId,
      dateCreated: new Date(),
      message: context.postContent,
      messageType: 'post',
      messagePayload: {
        title: context.title
      }
    };

    if(context.fileId) {
      query.messagePayload.image = context.fileId;
    }

    if(! context.draft)
      query.messagePayload.draft = false;
    else
      query.messagePayload.draft = context.draft;

    Messages.insert(query, function(e, r) {
      return(e, r);
    });
  },
  addNewsMessageToRoom: function(roomId, context) {
    check(roomId, String);
    check(context, {
      postContent: String,
      title: String,
      fileUrl: String,
      newsType: String,
      author: Match.Optional(String)
    });

    var room = Rooms.findOne(roomId);

    if(! room)
      throw new Meteor.Error(404, "Room not found!");

    if(! context.author)
      context.author = this.userId;

    var query = {
      roomId: roomId,
      creatorId: context.author,
      dateCreated: new Date(),
      message: context.postContent,
      messageType: 'news',
      messagePayload: {
        title: context.title,
        image: context.fileUrl,
        newsType: context.newsType
      }
    };

    Messages.insert(query, function(e, r) {
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
