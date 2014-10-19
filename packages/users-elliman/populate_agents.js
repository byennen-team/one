var userFromEllimanRow = function (row) {
  var elliman = {
    id: row.ID,
    firstName: row.FIRST_NAME,
    lastName: row.LAST_NAME,
    location: {
      cityId: row.CITY_ID,
      stateId: row.STATE_ID,
      zipCode: row.US_ZIP_CODE_ID
    },
    numbers: {},
    officeId: row.OFFICE_ID,
    title: row.TITLE
  };

  if (row.PHONE_NUMBER) elliman.numbers.phone = row.PHONE_NUMBER;
  if (row.PHONE_EXTENSION) elliman.numbers.phoneExtension = row.PHONE_EXTENSION;
  if (row.FAX_NUMBER) elliman.numbers.fax = row.FAX_NUMBER;
  if (row.MOBILE) elliman.numbers.mobile = row.MOBILE;

  if (row.PHOTO_URL) elliman.photoUrl = row.PHOTO_URL;

  var emails = [];

  if (row.EM_ADDRESS && Match.test(row.EM_ADDRESS, MatchEx.Email())) {
    // Figure out how to handle duplicates before inserting emails
//    emails.push({
//      address: row.EM_ADDRESS,
//      verified: true
//    });
  }

  var user = {
    emails: emails,
    services: {
      elliman: elliman
    }
  };

  // Throw and log errors on users that do not match the model
  try {
    check(user, User.model);
  } catch (ex) {
    // log the user with the issue
    console.log('Issue with', JSON.stringify(user));
    throw ex;
  }

  return user;
};

// Populate the users collection with elliman agents.
Meteor.startup(function () {
  var numUsers = Meteor.users.find().count();
  console.log('Total Users', numUsers);
  if (numUsers > 0) return;

  var ellimanAgents = JSON.parse(Assets.getText('elliman_agents_production.json'));
  _.each(ellimanAgents, function (row) {
    var user = userFromEllimanRow(row);
    Meteor.users.insert(user);
  });

  console.log('Inserted', ellimanAgents.length, 'elliman agents');
});
