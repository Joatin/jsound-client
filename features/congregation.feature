Feature: Congregation

  Scenario: Enter button
    Given I am logged in
    And I have several congregations
    And I am on the index page
    When I press the Enter button
    Then I should be redirected to the Select-Congregation page

  Scenario: Login
    Given I am logged out
    And I have several congregations
    When I successfully authenticate
    Then I should be redirected to the Select-Congregation page

  Scenario: Select congregation
    Given I have several congregations
    And I am on the Select-Congregation page
    When I click on a congregation
    Then I should be redirected to its home page

