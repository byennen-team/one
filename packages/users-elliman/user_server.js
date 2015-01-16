Meteor.users._ensureIndex({'profile.id': 1}, {unique: true});

/**
 * Publish the current user.
 */
Meteor.publish('user', function () {
  if (!this.userId) return [];
  // TODO cut down what fields we publish
  return Meteor.users.find(this.userId);
});

/**
 * The data needed for a public user profile.
 */
Meteor.publish('userProfile', function (slug) {
  check(slug, String);

  return Meteor.users.find({slug: slug}, {fields: {slug: 1, profile: 1}});
});

/**
 * The data needed for a public user profile.
 */
Meteor.publish('userProfiles', function (userIds) {
  check(userIds, [String]);

  return Meteor.users.find({_id: {$in: userIds}}, {fields: {slug: 1, profile: 1}});
});

Meteor.methods({
  /**
   * Setup a custom login method for elliman.
   */
  loginWithElliman: function (agentId, agentEmail) {
    var self = this;

    check(agentId, Number);
    check(agentEmail, String);
    var currentUser = Meteor.users.findOne(self.userId);

    return Accounts._loginMethod(this, 'loginWithElliman', arguments, 'loginWithElliman', function () {

      var user = Meteor.users.findOne({
        'profile.id': agentId
      });
      if (!user) throw new Meteor.Error('User not found');
      var _findEmail = _.find(user.emails, function(em) { 
          return em.address == agentEmail;
      });
      if (!_findEmail) throw new Meteor.Error('User Email Not Found');
      // Log the current user out.
      currentUser && Accounts._setLoginToken(currentUser._id, self.connection, null);

      return {userId: user._id};
    });
  }
});
