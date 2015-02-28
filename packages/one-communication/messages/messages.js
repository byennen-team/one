/* globals Messages: true */
Messages = new Meteor.Collection('messages');

commentSchema = new SimpleSchema({
  comment: { type: String },
  creatorId: { type: String },
  dateCreated: { type: Date }
});

Messages.simpleSchema = new SimpleSchema({
  //the id of the room
  roomId: { type: String },
  //the id of the user that created the post
  creatorId: { type: String },
  //the date at which the message was created
  dateCreated: { type: Date },
  //the message content. can be html
  message: { type: String, optional: true },
  //the message type:
  //  message for simple messages
  //  attachment for attachments
  //  event for events
  //  listing for listings
  //  post for posts (complex messages with formatting)
  messageType: { type: String, defaultValue: 'message' },
  //different depending on the type of message above:
  //message - left empty
  //attachment: 'documentId': String - the id of the document attached
  //post: 'title': String - the title of the post, 'image': image for the ->
  // -> post (optional)
  //event: TBD
  //listing: TBD
  messagePayload: { type: [Object], optional: true, blackbox: true},
  comments: { type: [commentSchema], optional: true },
  likes: { type: [String], optional: true }
});
