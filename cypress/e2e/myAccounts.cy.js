import loginUser from "../support/loginUser";
import myAccount from "../support/myAccount";

describe('login user and then go to the dashboard then products', () => {
    beforeEach(() => {
        cy.visit("https://courses.ultimateqa.com/users/sign_in");
        loginUser.fillEmail();
        loginUser.fillPassword();
        loginUser.submitForm();
        cy.url().should('include', '/enrollments');
    });

    it('To test the My Account Section', () => {
        Products.openDropdown(); // Click to open the dropdown by clicking the caret icon

    });
});