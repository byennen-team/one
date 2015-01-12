var userFromEllimanRow = function (row) {
  var profile = {
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
    title: row.TITLE,
    bio: row.BIO
  };

  if (row.PHONE_NUMBER) profile.numbers.phone = row.PHONE_NUMBER;
  if (row.PHONE_EXTENSION) profile.numbers.phoneExtension = row.PHONE_EXTENSION;
  if (row.FAX_NUMBER) profile.numbers.fax = row.FAX_NUMBER;
  if (row.MOBILE) profile.numbers.mobile = row.MOBILE;

  if (row.PHOTO_URL) profile.photoUrl = row.PHOTO_URL;

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
    profile: profile,
    slug: User.generateSlug(profile.firstName, profile.lastName)
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
var q_fetch_resize_and_upload = function(user){
  Meteor._powerQ.add(function(done) { FileTools.fetch_to_temp(user.profile.photoUrl); done(); })
  Meteor._powerQ.add(function(done) { console.log('intermediate thumb'); done();})
  Meteor._powerQ.add(function(done) { FileTools.resize_temp('thumb_'); done();})
  Meteor._powerQ.add(function(done){ FileTools.upload('thumb_', '/'+user.profile.id+'/thumb_'+user.profile.id); done();})
  Meteor._powerQ.add(function(done) { console.log('intermediate mobile'); done();})
  Meteor._powerQ.add(function(done) { FileTools.resize_temp('mobile_'); done() });
  Meteor._powerQ.add(function(done){ FileTools.upload('mobile_', '/'+user.profile.id+'/mobile_'+user.profile.id); done();})
  Meteor._powerQ.add(function(done) { FileTools.resize_temp('full_'); done() })
  Meteor._powerQ.add(function(done){ FileTools.upload('full_', '/'+user.profile.id+'/full_'+user.profile.id); done();})
}
Meteor.startup(function () {
  Meteor._powerQ = new PowerQueue({
      isPaused: true
    });
  var numUsers = Meteor.users.find().count();
  console.log('Total Users', numUsers);
  if (numUsers > 0) return;
  console.log('PQ', Meteor._powerQ.title)
  var ellimanAgents = JSON.parse(Assets.getText('elliman_agents.json'));
  _.each(ellimanAgents, function (row) {
    console.log('PQing: ', row.FIRST_NAME)
    var user = userFromEllimanRow(row);
    q_fetch_resize_and_upload(user)
  })
  console.log('Ready to run queue');
  Meteor._powerQ.run()
  console.log('queue finished', ellimanAgents.length, 'elliman agents');
});
