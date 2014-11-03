Template.searchBox.events({
  'input input': function (event) {
    Search.text(event.target.value);
  }
});

Template.searchBox.helpers({
  results: Search.results
});