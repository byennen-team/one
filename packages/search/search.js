Search = {};

Search.results = function () {
  var searchText = Search.text();

  var containsPattern = {$regex: new RegExp('.*' + searchText + '.*', 'i')};

  return Meteor.users.find({
    $or: [
      {'profile.firstName': containsPattern},
      {'profile.lastName': containsPattern},
      {'profile.title': containsPattern}
    ]
  });
};

Search.text = function (searchText) {
  if (typeof searchText === 'string') Session.set('searchText', searchText);
  return Session.get('searchText');
};

// Reset search on startup
Search.text('');