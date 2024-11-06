import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I visit Home page', () => {
  cy.visit('/app');
});

Then('I should be redirected to signin page', () => {
  cy.url().should('include', '/app/api/auth/signin');
});