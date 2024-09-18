import loginUser from "../support/loginUser";
describe('Login - UI and Functionality', () => {
    beforeEach(() => {
        cy.visit("https://courses.ultimateqa.com/users/sign_in")
    });

    it('Verify the login form UI components', () => {
        cy.get('input[name="user[email]"]').should('exist');
        cy.get('input[name="user[password]"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
        cy.get('input[name="user[remember_me]"]').should('exist');
    });

    it('Login with valid credentials', () => {
        loginUser.fillEmail();
        loginUser.fillPassword();
        loginUser.submitForm();
        cy.url().should('include', '/enrollments');
    });

    it('Validate error for login with incorrect email', () => {
        cy.get('input[name="user[email]"]').type('wrongemail@example.com');
        loginUser.fillPassword();
        loginUser.submitForm();
        cy.contains('Invalid email or password').should('exist');
    });

    it('Validate error for login with incorrect password', () => {
        loginUser.fillEmail();
        cy.get('input[name="user[password]"]').type('wrongpassword');
        loginUser.submitForm();
        cy.contains('Invalid email or password').should('exist');
    });

    it('Validate login fails with invalid email format', () => {
        cy.get('input[name="user[email]"]').type('invalid-email');
        loginUser.fillPassword();
        loginUser.submitForm();
        cy.contains('Please enter a valid email address').should('exist');
    });

    it('Verify "Remember Me" functionality', () => {
        loginUser.fillEmail();
        loginUser.fillPassword();
        cy.get('input[type="checkbox"][name="user[remember_me]"]').check(); // Fixed selector for Remember Me checkbox
        loginUser.submitForm();
        cy.reload();
        cy.url().should('include', '/enrollments');
    });

    it('Validate login fails after multiple incorrect attempts', () => {
        for (let i = 0; i < 5; i++) {
            loginUser.fillEmail();
            cy.get('input[name="user[password]"]').type('wrongpassword');
            loginUser.submitForm();
        }
        // cy.contains('Too many failed attempts').should('exist');
    });

    it.only('Login with case-insensitive email', () => {
        cy.get('input[name="user[email]"]').type('ALI123@AGLIE.COM');
        loginUser.fillPassword();
        loginUser.submitForm();
        cy.url().should('include', '/enrollments');
    });









    // it('login with credentials and go to the next page', () => {
    //     loginUser.fillEmail();
    //     loginUser.fillPassword();
    //     loginUser.submitForm();
    //     cy.url().should('include', '/enrollments');

    // });
})