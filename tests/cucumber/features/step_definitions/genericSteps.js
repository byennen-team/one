var assert = require('assert');

module.exports = function () {

  var helper = this;

  this.Given(/^I am on the home page$/, function (callback) {
    helper.world.browser.
      url(helper.world.cucumber.mirror.rootUrl).
      call(callback);
  });

  this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
    helper.world.browser.
      url(helper.world.cucumber.mirror.rootUrl + relativePath).
      call(callback);
  });

  this.Then(/^I should see the title of "([^"]*)"$/, function (expectedTitle, callback) {

    helper.world.browser.
      title(function (err, res) {
        assert.equal(res.value, expectedTitle);
        callback();
      });
  });


  this.Then(/^I should see "([^"]*)"$/, function (msg, callback) {
    helper.world.browser.
      waitFor('//*[contains(text(), "' + msg + '")]', function (err, element) {
        assert.equal(err, null, '\n' + err);
        assert.notEqual(element, null, msg + ' not found');
      }).
      call(callback);
  });

  this.Then(/^I should be logged in$/, function (callback) {
    helper.world.browser.
      waitForExist('.current-user', 5000).
      // saveScreenshot(process.env.PWD + '/auth1.png').
      click('.menu-link').
      waitForVisible('.current-user').
      getText('.current-user', function (err, username) {
        assert.equal(username, 'Jason Amirian');
      }).
      call(callback);
  });

  this.Then(/^I should see an error saying "([^"]*)"$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Given(/^I am unauthenticated$/, function (callback) {
    helper.world.browser.
      url(helper.world.cucumber.mirror.rootUrl + 'logout').
      waitForExist('.login-button').
      call(callback);
  });

  this.When(/^I enter my authentication information$/, function (callback) {
    helper.world.browser.
      setValue('input#agentID', '78').
      setValue('input#agentEmail', 'jason.amirian@elliman.com').
      submitForm('#agentLogin').
      call(callback);
  });

  this.When(/^I enter incorrect authentication information$/, function (callback) {
    helper.world.browser.
      setValue('input#agentID', '555').
      setValue('input#agentEmail', 'bad.email@elliman.com').
      submitForm('#agentLogin').
      call(callback);
  });


};

