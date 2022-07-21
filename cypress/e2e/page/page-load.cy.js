// <reference types="cypress"/>

const firstName = 'John';
const lastName = 'Doe';

context('General Page Load Settings Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Verify favicon and logo', () => {
        cy.document().its('head').find('link[rel="icon"]').should('have.attr', 'href').should('contain', 'cropped-favicon-32x32.png')
        cy.get('.logo').should('be.visible');
    });

    it('Verify cookies present', () => {
        cy.getCookie('username').should('have.property', 'value', firstName + ' ' + lastName);
    });
})


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    console.log(err)
    return false
})
