import {defineSupportCode} from 'cucumber';
import { browser, by } from 'protractor';
import {use, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

defineSupportCode(function({Then, When, Given}) {

  Given('I am logged out', function () {
    return browser.get('http://localhost:3000/').then(()=>{
      return expect(browser.findElement(by.id('loginButton'))).eventually.exist;
    });
  });

  When('I click on the login button', function () {
    browser.findElement(by.id('loginButton')).click();
  });

  Then('I should be redirected to the login page', function () {
    return expect(browser.getCurrentUrl()).eventually.contains('jsound.eu.auth0.com');
  });

  Given('I am on the login form page', function () {
    return browser.get('http://localhost:3000/').then(()=>{
      expect(browser.findElement(by.id('loginButton'))).eventually.exist;
      browser.findElement(by.id('loginButton')).click();
      return expect(browser.getCurrentUrl()).eventually.contains('jsound.eu.auth0.com');
    });
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

