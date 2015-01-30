/* globals SocialStatuses: true, SocialMedia: true */
SocialStatuses = new Mongo.Collection('socialStatuses');

SocialStatuses.simpleSchema = new SimpleSchema({
  userNetworkId: { type: String },
  text: { type: String },
  media: { type: [Object], optional: true, blackbox: true},
  datePosted: { type: String },
  network: { type: String },
  postId: { type: String },
  payload: { type: Object, blackbox: true }
});

SocialMedia = {};