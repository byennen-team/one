(function() {
  if (Meteor.isClient || !process.env.IS_MIRROR) {
    return;
  }

  Meteor.startup(function () {
    _insertUsers();
    console.log("Meteor.users:");
    console.log(Meteor.users.find().fetch());
  });

  function _insertUsers () {
    Meteor.users.remove({});
    Meteor.users.insert({
      "emails" : [
          {
              "address" : "jason.amirian@elliman.com",
              "verified" : true
          }
      ],
      "profile" : {
          "id" : 78,
          "firstName" : "Jason",
          "lastName" : "Amirian",
          "location" : {
              "cityId" : 2617081,
              "stateId" : 40,
              "zipCode" : 27752
          },
          "numbers" : {
              "phone" : 2123035213
          },
          "officeId" : 5,
          "title" : "Residential Broker",
          "bio" : " <br />JASON AMIRIAN <br />DOUGLAS ELLIMAN <br /> <br />."
      },
      "slug" : "jason-amirian",
    });
  }
})();
