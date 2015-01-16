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
var count_jobs = 1;
var q_fetch_resize_and_upload = function(user){
  var xpat = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  var _URL = user.profile.photoUrl;  
  var _ext = _URL.match(xpat)[0];
  var s3BaseURL = 'https://s3.amazonaws.com/'+Meteor.settings.AWS_BUCKET+'/user/';  
  Meteor._powerQ.add(function(done){
    console.log('#: ', count_jobs, ' : ', user.profile.id);
    done();
  });
  Meteor._powerQ.add(function(done) { 
    FileTools.fetch_to_temp(user.profile.photoUrl, done); 
  });
  Meteor._powerQ.add(function(done) { 
    FileTools.resize_temp('thumb_', done);
  });
  Meteor._powerQ.add(function(done){ 
    FileTools.upload('thumb_', '/user/'+user.profile.id+'/profile-images/thumb_'+user.profile.id, done);
  });
  Meteor._powerQ.add(function(done) { 
    FileTools.resize_temp('full_', done); 
  });
  Meteor._powerQ.add(function(done){ 
    FileTools.upload('full_', '/user/'+user.profile.id+'/profile-images/full_'+user.profile.id, done);
  });
  //
  Meteor._powerQ.add(function(done) {
      var large_url_raw = 'user/'+user.profile.id+'/profile-images/full_'+user.profile.id+_ext;
      var thumb_url_raw = 'user/'+user.profile.id+'/profile-images/thumb_'+user.profile.id+_ext;
      var thumb_signed = FileTools.signedGetS3(thumb_url_raw);
      var large_signed = FileTools.signedGetS3(large_url_raw);
    user.profile.photoUrl = {
        large: large_signed,
        thumb: thumb_signed
    }
    var user_mongo = Meteor.users.insert(user);
    console.log('end:', count_jobs++, ' mongo: ', user_mongo, user.emails[0]); 
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
  var ellimanAgents = JSON.parse(Assets.getText('elliman_agents_production.json'));
  if (Meteor.settings.public && (Meteor.settings.public.ENVIRONMENT === 'development')) {
      ellimanAgents = ellimanAgents.slice(144,157);
  }
  var count = 1;
  var q_count = 0;
  _.each(ellimanAgents, function (row) {
    console.log('begin insert:', row.FIRST_NAME, ' : ', row.EM_ADDRESS);
    var user = userFromEllimanRow(row);
    if (!user.profile.photoUrl || (user.profile.photoUrl.length === 0)) return '';
    console.log('PQing: ', count++, row.FIRST_NAME);
    q_fetch_resize_and_upload(user);
  });
  console.log('Ready to run queue');
  Meteor._powerQ.run();
  console.log('queue running', ellimanAgents.length, 'elliman agents');
});
