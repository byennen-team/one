console.log("Current Companies: " + Companies.find().count());

Meteor.publish("companies", function () {
  console.log("add company");
  return Companies.find({});
});
