Meteor.users._ensureIndex({ 'services.elliman.id': 1}, { unique: true });

/**
 * Publish the current user.
 */
Meteor.publish('user', function () {
  if (! this.userId) return [];

  // TODO cut down what fields we publish
  return Meteor.users.find(this.userId);
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
        'services.elliman.id': agentId
      });
      if (! user) throw new Meteor.Error('User not found');

      // Log the current user out.
      currentUser && Accounts._setLoginToken(currentUser._id, self.connection, null);

      return { userId: user._id };
    });
  }
});