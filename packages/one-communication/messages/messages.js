Messages = new Meteor.Collection('messages');

Messages.simpleSchema = new SimpleSchema({
  roomId: { type: String },
  creatorId: { type: String },
  dateCreated: { type: Date },
  message: { type: String },
  messageType: { type: String, optional: true}
  messagePayload: {type: [Object], optional: true, blackbox: true}
});