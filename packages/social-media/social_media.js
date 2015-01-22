SocialStatuses = new Mongo.Collection('socialStatuses');

SocialStatuses.simpleSchema = new SimpleSchema({
  userNetworkId: { type: String },
  text: { type: String },
  media: { type: String },
  datePosted: { type: String },
  network: { type: String },
  postId: { type: String }
});

SocialMedia = {};