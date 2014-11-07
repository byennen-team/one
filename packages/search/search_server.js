var Future = Npm.require('fibers/future');

var searchUsers = function (searchText) {
  var future = new Future();

  MongoInternals.defaultRemoteCollectionDriver().mongo.db.executeDbCommand({
    text: 'users',
    search: searchText,
    limit: 6,
    project: {
      _id: 1 // Only take the ids
    }
  }, function (error, results) {
    if (error) throw error;

    if (results && results.documents[0].ok === 1) {
      results = results.documents[0].results;

      var ids = [];
      for (var i = 0; i < results.length; i++) {
        ids.push(results[i].obj._id);
      }

      future.return(ids);
    } else {
      future.return([]);
    }
  });

  return future.wait();
};

Meteor.publish('searchResults', function (searchText) {
  if (!this.userId) throw new Meteor.Error('Invalid credentials');

  // TODO only publish users from the same company
  if (!searchText || !searchText.length) return Meteor.users.find({}, {fields: {_id: 1, profile: 1}, limit: 6});

  var userIds = searchUsers(searchText);

  if (!userIds.length) return [];

  return Meteor.users.find({
    _id: {
      $in: userIds
    }
  });
});

Meteor.startup(function () {
  var search_index_name = 'search_users_index';

  Meteor.users._ensureIndex({
    'profile.firstName': 'text',
    'profile.lastName': 'text',
    'profile.title': 'text'
  }, {
    name: search_index_name
  });
});
