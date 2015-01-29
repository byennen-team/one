var filterByLetter = function () {
  if (Routes.getName() === Routes.DIRECTORY) {
    var params = Router.current().params;
    if (params.letter) return params.letter;
  }

  return null;
};

var getOptions = function () {
  // dont filter by first letter when searching
  var options;
  if (Search.text()) {
    options = {
      text: Search.text(),
      limit: Search.limit.get()
    };
  } else {
    options = {
      text: Search.text(),
      letter: filterByLetter(),
      limit: Search.limit.get()
    };
  }

  if (!options.text) delete options.text;
  if (!options.letter) delete options.letter;

  return options;
};

Search.limit = new ReactiveVar(100);

Search.text = function (searchText) {
  if (typeof searchText === 'string') Session.set('searchText', searchText);

  return Session.get('searchText');
};

// Reset search on startup
Search.text('');

Search.results = function () {
  return Search.cursor(getOptions());
};

Template.searchBox.events({
  'input input': function (event) {
    Search.text(event.target.value);
  },

  'click .user': function () {
    var user = Meteor.users.findOne({_id: this._id});
    console.log(user);
    $('.results').velocity("slideUp");
    Router.go(Routes.PROFILE, {slug: user.slug});
  },
// TODO: This needs to clear search results, not just the input value
  'click #navbar-search-clear': function () {
    $( '#navbar-search-input' ).val("");
  }
});

Template.searchBox.helpers({
  hide: function () {
    return !Search.text() || Routes.getName() === Routes.DIRECTORY;
  },
  results: Search.results
});

Tracker.autorun(function () {
  return Meteor.subscribe('searchResults', getOptions());
});
