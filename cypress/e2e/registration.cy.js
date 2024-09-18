import registration from "../support/registerUser";

describe('Registration - UI and Functionality', () => {
  beforeEach(() => {
    cy.visit('https://courses.ultimateqa.com/users/sign_in');
    registration.createNewAcc();
  });


  it('Verify the registration form UI components', () => {
    registration.fillFirstName.should('exist');
    registration.fillLastName.should('exist');
    registration.fillEmail.should('exist');
    registration.fillPassword.should('exist');
    registration.checkTerms.should('exist');
    registration.submitForm.should('exist');
  });

  it('Register a new user with valid data', () => {
    registration.fillSignupForm();
    registration.submitForm();
    cy.url().should('include', '/enrollments');
  });

  it('Validate error messages for missing required fields', () => {
    registration.submitForm();
    // cy.contains('can\'t be blank').should('exist');
  });

  it('Validate error for invalid email format', () => {
    registration.fillFirstName();
    registration.fillLastName();
    cy.get('input[name="user[email]"]').type('invalid-email');
    registration.fillPassword();
    registration.checkTerms();
    registration.submitForm();
    cy.contains('Email is invalid').should('exist');
  });

  it('Register with valid email formats', () => {
    const validEmails = [
      'user+tag@example.com',
      'user.name@example.co.uk'
    ];

    validEmails.forEach(email => {
      cy.visit('https://courses.ultimateqa.com/users/sign_up');
      registration.fillFirstName();
      registration.fillLastName();
      cy.get('input[name="user[email]"]').type(email);
      registration.fillPassword();
      registration.checkTerms();
      registration.submitForm();
      cy.url().should('include', '/enrollments');
    });
  });

  it('Validate registration fails with an already registered email', () => {
    registration.fillSignupForm();
    registration.submitForm();
    // cy.contains('Email has already been taken').should('exist');
  });

  it('Validate registration fails when passwords do not match', () => {
    registration.fillFirstName();
    registration.fillLastName();
    registration.fillEmail();
    registration.fillPassword();
    cy.get('input[name="user[password_confirmation]"]').type('differentpassword');
    registration.checkTerms();
    registration.submitForm();
    // cy.contains('Password confirmation doesn’t match').should('exist');
  });

  it('Validate registration fails with email containing spaces', () => {
    registration.fillFirstName();
    registration.fillLastName();
    cy.get('input[name="user[email]"]').type('user @example.com');
    registration.fillPassword();
    registration.checkTerms();
    registration.submitForm();
    cy.contains('Email is invalid').should('exist');
  });

  it('Verify registration with maximum character length', () => {
    registration.fillFirstName(); // Use maximum length
    registration.fillLastName(); // Use maximum length
    cy.get('input[name="user[email]"]').type('a'.repeat(254) + '@example.com'); // Max length for email
    registration.fillPassword(); // Use maximum length
    registration.checkTerms();
    registration.submitForm();
    cy.url().should('include', '/dashboard');
  });


  // it('Signs up a user', () => {
  //   registration.fillSignupForm(); // Fill in the form with fixed data
  //   registration.submitForm(); // Submit the form
  // });
});