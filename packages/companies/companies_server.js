Companies.allow({
  insert: function () {
    // TODO: Security
    return true;
  }
});

Meteor.publish('companies', function () {
  return Companies.find({});
});
