/* globals Messages: true */
Messages = new Meteor.Collection('messages');

Messages.simpleSchema = new SimpleSchema({
  roomId: { type: String },
  creatorId: { type: String },
  dateCreated: { type: Date },
  message: { type: String },
  messageType: { type: String, defaultValue: 'message' },
  messagePayload: { type: [Object], optional: true, blackbox: true}
});

