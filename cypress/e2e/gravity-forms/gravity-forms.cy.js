// <reference types="cypress"/>

const firstName = 'John';
const lastName = 'Doe';
const email = 'info@test.com';
const conformation = 'Thanks for contacting us! We will get in touch with you shortly.';

context('Gravity Form 2 Step Tests', () => {
    //Use the cy.fixture() method to pull data from fixture file
    before(function () {
        cy.fixture('forms').then(function (data) {
            this.data = data;
        })
    })

    beforeEach(() => {
        cy.visit('/2-step-form-example/');
    });

    it('2 Step Form has correct visibility', () => {
        cy.get('#gform_1').should('be.visible');
        cy.get('#gform_page_1_2').should('not.be.visible');
    });

    it('Check Validation for first step form', () => {
        cy.get('.name-field  input').type(firstName + ' ' + lastName);
        cy.get('.dropdown-field  select').select('first');
        cy.get('#gform_next_button_1_1').click({force: true});

        cy.wait(500);

        cy.get('.email-field .validation_message').should('have.text', 'This field is required.')
        // cy.screenshot('actions/forms/first-step-form-validation');
    });

    it('Complete the 2 step form', () => {

        cy.get('.name-field  input').type(firstName + ' ' + lastName);
        cy.get('.email-field  input').type(email);
        cy.get('.dropdown-field  select').select('first');
        cy.get('#gform_next_button_1_1').click({force: true});

        cy.wait(500);

        cy.get('.email2-field  input').type('info@test.com')
        cy.contains('First Choice');
        cy.get('.checkbox-field input').check(['first']);

        cy.submitGravityForm();

        cy.wait(500);

        cy.checkConfirmationContent(conformation);
    });
})


context('Contact Form Tests', () => {
    beforeEach(() => {
        cy.visit('/contact-us/');
    });

    it('Contact Form has correct visibility', () => {
        cy.get('#gform_2').should('be.visible');
    });

    it('Complete the contact form', () => {
        cy.get('.name_first  input').type(firstName);
        cy.get('.name_last  input').type(lastName);
        cy.get('.ginput_container_email  input').type(email);
        cy.get('.ginput_container_phone  input').type('000 000 000');
        cy.get('.ginput_container_textarea  textarea').type('Give some cake.');
        cy.confirmCaptcha();
        // cy.screenshot('actions/forms/contact-us-before-submit');
        cy.submitGravityForm();
        // cy.screenshot('actions/forms/contact-us-after-submit');
        cy.wait(500);
        cy.checkConfirmationContent(conformation);
    });
})

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    console.log(err)
    return false
})
