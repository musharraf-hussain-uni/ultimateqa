import loginUser from "../support/loginUser";
import Products from "../support/products";

describe('login user and then go to the dashboard then products', () => {
    beforeEach(() => {
        cy.visit("https://courses.ultimateqa.com/users/sign_in");
        loginUser.fillEmail();
        loginUser.fillPassword();
        loginUser.submitForm();
        cy.url().should('include', '/enrollments');
    });

    it('go to the products page', () => {
        Products.collections();
        cy.url().should('include', '/collections');
    });
});