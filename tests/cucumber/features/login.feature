Feature: Allow users to login and logout

  As a user of the app
  I want login and logout
  So that I can prove my identity and work with my data

  Background:
    Given I am unauthenticated

  Scenario: A user can login
    Given I am on the home page
    When I enter my authentication information
    Then I should be logged in

  Scenario: Errors on bad login
    Given I am on the home page
    When I enter incorrect authentication information
    Then I should see a user not found error
