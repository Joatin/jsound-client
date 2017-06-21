import {defineSupportCode} from 'cucumber';
import { browser } from 'protractor';
import {use, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

defineSupportCode(function({Then, When}) {
  When('I go to the home page', function () {
    return browser.get('http://localhost:3000/');
  });

  Then('I should see the title {title}', function (title, callback: any) {
    console.log(title);
    expect(browser.getTitle()).to.eventually.equal(title).and.notify(callback);
  });

});
