Template.searchBox.events({
  'input input': function (event) {
    Search.text(event.target.value);
  }
});

Template.searchBox.helpers({
  hide: function () {
    return !Search.text() || Routes.getName() === Routes.DIRECTORY;
  },
  results: Search.results
});

Tracker.autorun(function () {
  return Meteor.subscribe('searchResults', Search.text());
});