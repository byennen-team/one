/* global PowerQueue: false */

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
    emails.push({
      address: row.EM_ADDRESS,
      verified: true
    });
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
var countJobs = 1;
var qFetchResizeAndUpload = function(user){
  var xpat = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  var _URL = user.profile.photoUrl;
  var _ext = _URL.match(xpat)[0];
  Meteor._powerQ.add(function(done){
    console.log('#: ', countJobs, ' : ', user.profile.id);
    done();
  });
  Meteor._powerQ.add(function(done) {
    FileTools.fetchToTemp(user.profile.photoUrl, done);
  });
  Meteor._powerQ.add(function(done) {
    FileTools.resizeTemp('thumb_', done);
  });
  Meteor._powerQ.add(function(done){
    FileTools.upload(
      'thumb_',
      '/user/'+user.profile.id+'/profile-images/thumb_'+user.profile.id,
      done
    );
  });
  Meteor._powerQ.add(function(done) {
    FileTools.resizeTemp('full_', done);
  });
  Meteor._powerQ.add(function(done){
    FileTools.upload(
      'full_',
      '/user/'+user.profile.id+'/profile-images/full_'+user.profile.id,
      done
    );
  });
  //
  Meteor._powerQ.add(function(done) {
      var largeUrlRaw = '/user/'+user.profile.id+
        '/profile-images/full_'+user.profile.id+_ext;
      var thumbUrlRaw = '/user/'+user.profile.id+
        '/profile-images/thumb_'+user.profile.id+_ext;
      var thumbSigned = FileTools.signedGet(thumbUrlRaw);
      var largeSigned = FileTools.signedGet(largeUrlRaw);
    user.profile.photoUrl = {
        large: largeSigned,
        thumb: thumbSigned
    };
    Meteor.users.insert(user);
    console.log('X:', countJobs++, ' email: ',  user.emails[0].address);
    done();
  });
};
Meteor.startup(function () {
  Meteor._powerQ = new PowerQueue({
      isPaused: true
    });
  var numUsers = Meteor.users.find().count();
  console.log('Total Users', numUsers);
  if (numUsers > 0) return;
  console.log('PQ', Meteor._powerQ.title);
  var ellimanAgents = JSON.parse(
    Assets.getText('elliman_agents_production.json')
  );
  if (Settings.isDevelopment || Settings.isStaging) {
      ellimanAgents = ellimanAgents.slice(14,33);
  }
  var count = 1;
  _.each(ellimanAgents, function (row) {
    console.log('begin insert:', row.FIRST_NAME, ' : ', row.EM_ADDRESS);
    var user = userFromEllimanRow(row);
    if (!user.profile.photoUrl || (user.profile.photoUrl.length === 0))
      return '';
    console.log('PQing: ', count++, row.FIRST_NAME);
    qFetchResizeAndUpload(user);
  });
  console.log('Ready to run queue');

  Meteor._powerQ.run();
  Meteor._powerQ.add(function(done){
    FileTools.cleanupTemp(done);
  });
  console.log('queue running', ellimanAgents.length, 'elliman agents');
});
