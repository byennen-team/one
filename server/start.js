Agents = new Meteor.Collection("Agents");

Meteor.startup(function() {
  EllimanAgent = JSON.parse(Assets.getText('elliman_agents_production.json'));

  if(Agents.find().count() === 0){
    _.each(EllimanAgent, function(data) {
      Agents.insert(data);
    });
  }
 console.log(Agents.find().count());
});
