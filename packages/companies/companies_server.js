Companies.allow({
  insert: function (userId, doc) {
    return true;
  }
});

Meteor.publish('companies', function () {
  return Companies.find({});
});