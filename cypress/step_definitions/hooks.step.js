import { After, Before } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.get('a.Button').contains('Log in').click({force: true});
});

After(() => {
    cy.get('[data-automationid="xnav-addon-user-iconbutton"]').click();
    cy.get('[data-automationid="xnav-addon-user-body"] [data-name="user-menu/log-out"]').click();
});
