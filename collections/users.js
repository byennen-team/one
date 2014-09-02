var Schema = {};

Schema.User = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  emails: {
    type: [Object]
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: { // public and modifiable
    type: Object,
    optional: true,
    blackbox: true
  }
});

// Meteor.users.attachSchema(Schema.User);

Meteor.users.allow({
  update: function(userId, doc){
  	return isAdminById(userId) || userId == doc._id;
  },
  remove: function(userId, doc){
  	return isAdminById(userId) || userId == doc._id;
  }
});
