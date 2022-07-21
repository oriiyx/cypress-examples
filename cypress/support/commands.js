// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('confirmCaptcha', function () {
    cy.wait(500);
    cy.get('iframe')
        .first()
        .its('0.contentDocument.body')
        .should('not.be.undefined')
        .and('not.be.empty')
        .then(cy.wrap)
        .find('#recaptcha-anchor')
        .should('be.visible')
        .click();
});

Cypress.Commands.add('submitGravityForm', function () {
    cy.get('input.gform_button').click();
});

Cypress.Commands.add('checkConfirmationContent', function (content) {
    cy.get('.gform_confirmation_message').should('have.text', content);
});
