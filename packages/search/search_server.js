Meteor.publish('searchResults', function (search) {
  if (!this.userId) throw new Meteor.Error('Invalid credentials');

  check(search, {
    text: Match.Optional(String),
    letter: Match.Optional(String),
    limit: Match.Optional(Number)
  });

  return Search.cursor(search, {
    fields: {_id: 1, profile: 1},
    limit: search.limit || 100
  });
});