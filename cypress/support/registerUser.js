class Registration {
    constructor() {
        this.firstName = 'Muhammad';
        this.lastName = 'Ali';
        this.email = `ali123@aglie.com`; // Ensure this email is unique if required
        this.password = '0123456789';
    }

    // Getter for the "Create New Account" button
    get createNewBtn() {
        return cy.get('#main-content > div > div > aside > a');
    }

    // Method to click the "Create New Account" button
    createNewAcc() {
        this.createNewBtn.click();
    }

    // Method to fill in the first name
    fillFirstName() {
        cy.get('input[name="user[first_name]"]').type(this.firstName);
    }

    // Method to fill in the last name
    fillLastName() {
        cy.get('input[name="user[last_name]"]').type(this.lastName);
    }

    // Method to fill in the email
    fillEmail() {
        cy.get('input[name="user[email]"]').type(this.email);
    }

    // Method to fill in the password
    fillPassword() {
        cy.get('input[name="user[password]"]').type(this.password);
    }

    // Method to check the terms and conditions
    checkTerms() {
        cy.get('input[name="user[terms]"]').check({
            force: true
        });
    }


    // Method to fill in the entire form
    fillSignupForm() {
        this.fillFirstName();
        this.fillLastName();
        this.fillEmail();
        this.fillPassword();
        this.checkTerms();
    }

    // Method to submit the form
    submitForm() {
        cy.get('button[type="submit"]').click();
        // Optionally add verification for successful registration
        // cy.url().should('include', '/dashboard');  // Adjust based on actual success page or URL
        // cy.contains('Welcome').should('exist');    // Adjust based on actual success message or indicator
    }
}

export default new Registration();