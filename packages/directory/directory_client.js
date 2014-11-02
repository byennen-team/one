Meteor.subscribe('users');

Template.directory.helpers = function () {
  return Meteor.users.find();
};
