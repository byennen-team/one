//Question: Why is Users undefinded here?

Meteor.publish('users', function () {
  return Meteor.users.find();
});

Template.searchBox.users = function () {
  return Users.find();
};
