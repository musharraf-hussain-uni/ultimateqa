class myAcc {
    // Click the dropdown caret icon to open the menu
    openDropdown() {
        cy.get('body > header > div.header__container > div > nav > ul > li.dropdown.header__nav-item > button').click(); // Use the correct selector for the dropdown trigger
    }

    // Select an option from the dropdown
    // selectDropdownOption(optionText) {
    //     cy.get('.dropdown-menu') // Ensure this selector matches your dropdown menu container
    //         .contains(optionText) // Find the option by its visible text
    //         .click();
    // }
}

export default new myAcc();