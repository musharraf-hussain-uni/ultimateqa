class loginUser {
    constructor() {
        this.email = 'ali123@aglie.com';
        this.password = '0123456789';
    }

    fillEmail() {
        cy.get('input[name="user[email]"]').type(this.email);
    }
    fillPassword() {
        cy.get('input[name="user[password]"]').type(this.password);
    }
    submitForm() {
        cy.get('button[type="submit"]').click();
    }
    checkRememberMe() {
        cy.get('input[type="checkbox"][name="user[remember_me]"]').check();
    }
}
export default new loginUser();