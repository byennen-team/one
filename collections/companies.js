Companies = new Meteor.Collection("companies");

Companies.allow({
  insert: function(userId, doc) {
    return true;
  }
})
