
Feature: page
    Scenario: visiting the home page without session
        When I visit Home page
        Then I should be redirected to signin page