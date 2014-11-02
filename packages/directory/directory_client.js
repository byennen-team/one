Template.directory.helpers({
  users: function () {
    return Meteor.users.find({}, {limit: 15});
  }
});
