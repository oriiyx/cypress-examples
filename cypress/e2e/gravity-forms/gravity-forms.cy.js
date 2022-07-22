// <reference types="cypress"/>

context('Gravity Form 2 Step Tests', () => {
    let forms;
    beforeEach(() => {
        cy.visit('/2-step-form-example/');
        //Use the cy.fixture() method to pull data from fixture file
        cy.fixture('forms').then((formsData) => {
            forms = formsData;
        })
    });

    it('2 Step Form has correct visibility', () => {
        console.log(forms);
        cy.get('#gform_1').should('be.visible');
        cy.get('#gform_page_1_2').should('not.be.visible');
    });

    it('Check Validation for first step form', () => {
        cy.get('.name-field  input').type(forms.firstName + ' ' + forms.lastName);
        cy.get('.dropdown-field  select').select('first');
        cy.get('#gform_next_button_1_1').click({force: true});

        cy.wait(500);

        cy.get('.email-field .validation_message').should('have.text', 'This field is required.')
        // cy.screenshot('actions/forms/first-step-form-validation');
    });

    it('Complete the 2 step form', () => {

        cy.get('.name-field  input').type(forms.firstName + ' ' + forms.lastName);
        cy.get('.email-field  input').type(forms.email);
        cy.get('.dropdown-field  select').select('first');
        cy.get('#gform_next_button_1_1').click({force: true});

        cy.wait(500);

        cy.get('.email2-field  input').type('info@test.com')
        cy.contains('First Choice');
        cy.get('.checkbox-field input').check(['first']);

        cy.submitGravityForm();

        cy.wait(500);

        cy.checkConfirmationContent(forms.conformation);
    });
})


context('Contact Form Tests', () => {
    let forms;

    beforeEach(() => {
        cy.visit('/contact-us/');
        //Use the cy.fixture() method to pull data from fixture file
        cy.fixture('forms').then((formsData) => {
            forms = formsData;
        })
    });

    it('Contact Form has correct visibility', () => {
        cy.get('#gform_2').should('be.visible');
    });

    it('Complete the contact form', () => {
        cy.get('.name_first  input').type(forms.firstName);
        cy.get('.name_last  input').type(forms.lastName);
        cy.get('.ginput_container_email  input').type(forms.email);
        cy.get('.ginput_container_phone  input').type('000 000 000');
        cy.get('.ginput_container_textarea  textarea').type('Give some cake.');
        cy.confirmCaptcha();
        // cy.screenshot('actions/forms/contact-us-before-submit');
        cy.submitGravityForm();
        // cy.screenshot('actions/forms/contact-us-after-submit');
        cy.wait(500);
        cy.checkConfirmationContent(forms.conformation);
    });
})

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    console.log(err)
    return false
})
