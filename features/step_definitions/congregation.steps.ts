import {defineSupportCode} from 'cucumber';
import { browser } from 'protractor';
import {use, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

defineSupportCode(function({Then, When, Given}) {

  Given('I have several congregations', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Given('I am on the index page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  When('I press the Enter button', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I should be redirected to the Select-Congregation page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  When('I successfully authenticate', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Given('I am on the Select-Congregation page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  When('I click on a congregation', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I should be redirected to its home page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

});

