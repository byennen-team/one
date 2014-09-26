// Populate the users collection with elliman agents.
Meteor.startup(function () {
  var numUsers = Meteor.users.find().count();
  console.log('Total Users', numUsers);
  if(numUsers > 0) return;

  var ellimanAgents = JSON.parse(Assets.getText('elliman_agents_production.json'));
  _.each(ellimanAgents, function (data) {
    Meteor.users.insert(data);
  });

  console.log('Inserted', ellimanAgents.length, 'elliman agents');
});