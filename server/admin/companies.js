console.log("Current Companies: " + Companies.find().count());

Meteor.publish("companies", function () {
  return Companies.find({});
});
