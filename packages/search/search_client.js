Template.searchBox.events({
  'input input': function (event) {
    Session.set('searchText', event.target.value);
  }
});

Template.searchBox.helpers({
  results: function () {
    return Meteor.users.find();
  }
});