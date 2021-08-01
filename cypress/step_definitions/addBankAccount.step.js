import {Given} from "cypress-cucumber-preprocessor/steps";
import {TableDefinition} from 'cucumber';

const securityQuestions = [
    {question: 'As a child, what did you want to be when you grew up?', index: 1},
    {question: 'What is your dream car?', index: 2},
    {question: 'What is your dream job?', index: 3}
];

Given('My bank accounts page is opened', (data) => {
    const user = data.hashes()[0];
    cy.get('[placeholder="Email address"]').type(user.email);
    cy.get('[placeholder="Password"]').type(user.password);
    cy.get('[data-automationid="LoginSubmit--button"]').click();

    cy.get('[data-automationid="auth-continuebutton"]').click();
    cy.get('[data-automationid="auth-authwithsecurityquestionsbutton"]').click();
    ['first', 'second'].forEach(order => {
        let index;
        cy.get(`[data-automationid="auth-${order}answer--label"]`).invoke('text').then((text) => {
            const questionItem = securityQuestions.find(item => item.question === text);
            index = questionItem.index;
            cy.get(`[data-automationid="auth-${order}answer--input"]`).type(`answer ${index}`);
        });
    });
    cy.get('[data-automationid="auth-submitanswersbutton"]').click();
    cy.get('[data-name="navigation-menu/accounting"]').click().then(() => {
        cy.get('[data-name="navigation-menu/accounting/bank-accounts"]').click();
        cy.title().should('include', 'Bank accounts');
    })
});

When('I add an ANZ bank account', (keyword) => {
    cy.get('.button>a').contains('Add Bank Account').click();
    cy.get('a[data-automationid="popularBank-0"]',  {timeout: 10000}).click();
    const faker = require('faker');
    cy.get('input[id^="accountname"]').type(faker.name.findName());
    cy.get('input[id^="accounttype"]').click();
    cy.get('li.ba-combo-list-item').contains('Everyday (day-to-day)').click();
    cy.get('label').contains('Account Number').siblings().as('an');
    cy.get('div[id^="accountDetailGeneric"] [data-automationid="accountNumber"]').type(Math.round(Math.random() * 999999999999999));
    cy.get('a[id^="common-button-submit"]').click();
});

Then(`I can see the header {string}`, (header) => {
    cy.contains(header, {timeout: 10000});
});
