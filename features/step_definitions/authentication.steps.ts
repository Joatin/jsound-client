import {defineSupportCode} from 'cucumber';
import { browser } from 'protractor';
import {use, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

defineSupportCode(function({Then, When, Given}) {

  Given('I am logged out', function () {
    // Write code here that turns the phrase above into concrete actions
    browser.get('/')
  });

  When('I click on the login button', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I should be redirected to the login page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Given('I am on the login form page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  When('I fill in the form', function (table) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I should be redirected back to the app', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Given('I am logged in', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  When('I press the logout button', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I should be logged out', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

});

