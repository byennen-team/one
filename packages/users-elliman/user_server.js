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
 * Publish the current user.
 */
Meteor.publish('users', function () {
  if (!this.userId) return [];

  // TODO only publish users from the same company
  return Meteor.users.find({}, {fields: {_id: 1, profile: 1}});
});

Meteor.methods({
  /**
   * Setup a custom login method for elliman.
   */
  loginWithElliman: function (agentId) {
    var self = this;

    check(agentId, Number);

    var currentUser = Meteor.users.findOne(self.userId);

    return Accounts._loginMethod(this, 'loginWithElliman', arguments, 'loginWithElliman', function () {

      var user = Meteor.users.findOne({
        'profile.id': agentId
      });

      if (!user) throw new Meteor.Error('User not found');

      // Log the current user out.
      currentUser && Accounts._setLoginToken(currentUser._id, self.connection, null);

      return {userId: user._id};
    });
  }
});
