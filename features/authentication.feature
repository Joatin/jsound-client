Feature: Authentication
  As a user i want to be able to log in and to be able to log out.

  Scenario: Login button redirect
    Given I am logged out
    When I click on the login button
    Then I should be redirected to the login page

  Scenario: Login form
    Given I am on the login form page
    When I fill in the form
      | username | password |
      | testuser | test1234 |
    Then I should be redirected back to the app

  Scenario: Logout button
    Given I am logged in
    When I press the logout button
    Then I should be logged out
