Meteor.subscribe('users');

Users.initEasySearch(['profile.firstName', 'profile.lastName', 'profile.title'], {
    'limit' : 20
});
