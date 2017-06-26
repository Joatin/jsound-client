/**
 * @author: @joatin
 */

require('ts-node/register');
var helpers = require('./helpers');

exports.config = {
  baseUrl: 'https://localhost:3000/',

  /**
   * Use `npm run e2e`
   */
  specs: [
    helpers.root('features/**/*.feature') // accepts a glob
  ],
  exclude: [],

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  allScriptsTimeout: 110000,

  cucumberOpts: {
    compiler: "ts:ts-node/register",
    require: [
      helpers.root('features/step_definitions/**/*.ts'),
      helpers.root('features/support/**/*.ts')
    ],
    strict: true,
    format: ['pretty', 'pretty:output.txt'],
    "format-options": ['{ "snippetInterface": "promise"}']
  },

  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
   useAllAngular2AppRoots: true
};
