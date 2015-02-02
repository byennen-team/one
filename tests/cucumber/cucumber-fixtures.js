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
          "bio" : " <br />JASON AMIRIAN <br />DOUGLAS ELLIMAN <br /> <br />For years, Jason Amirian canvassed New York City seeking the ideal offices and retail space for his commercial clients. In deciding to transfer his seasoned skills to the residential market, he brought with him not only a wealth of connections including relationships with major NYC landlords, but incomparable knowledge that ensures homebuyers and sellers the very best results.  <br /> <br />When not hard at work, Jason's favorite pastimes include staying fit and sports. He most of all likes playing basketball and volleyball, plus is a member of several softball leagues. Jason also enjoys going to classical and pop music concerts, dining in the city's ethnically diverse mix of restaurants, and traveling whenever possible - particularly to exotic places with beautiful beaches."
      },
      "slug" : "jason-amirian",
    });
  }
})();
