class Products {
    productsCollections() {
        cy.get('#search-form > div:nth-child(2) > a').click();
    }

    // Wrapper method to call the action
    collections() {
        this.productsCollections();
    }
}

export default new Products();