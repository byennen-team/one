Rooms = new Meteor.Collection('rooms');

var participantsSchema = new SimpleSchema({
  participantId: { type: String },
  dateJoined: { type: Date },
  lastReadTimestamp: { type: Date, optional: true }
});

Rooms.simpleSchema = new SimpleSchema({
  roomName: { type: String, optional: true },
  participants: { type: participantsSchema },
  dateCreated: { type: Date },
  roomType: { type: String, optional: true}
});
