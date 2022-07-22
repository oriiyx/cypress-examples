// <reference types="cypress"/>

context('General Page Load Settings Tests', () => {
    let forms;

    beforeEach(() => {
        cy.visit('/');
        //Use the cy.fixture() method to pull data from fixture file
        cy.fixture('forms').then((formsData) => {
            forms = formsData;
        })
    });

    it('Verify favicon and logo', () => {
        cy.document().its('head').find('link[rel="icon"]').should('have.attr', 'href').should('contain', 'cropped-favicon-32x32.png')
        cy.get('.logo').should('be.visible');
    });

    it('Verify cookies present', () => {
        cy.getCookie('username').should('have.property', 'value', forms.firstName + ' ' + forms.lastName);
    });
})


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    console.log(err)
    return false
})
