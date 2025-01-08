describe('Create Frontend', () => {
  let baseUrl;

  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url;
      cy.visit(baseUrl);
    });
  });

  after(() => {
    return cy.task('stopServer');
  });

  it('should navigate to create.html and add a new pet listing', () => {
    cy.visit(baseUrl + '/create.html');

    // Wait for elements to be visible
    cy.get('#name', { timeout: 20000 }).should('be.visible').type('Buddy');
    cy.get('#type').select('Dog');
    cy.get('#breed').select('Golden Retriever');
    cy.get('#age').select('1-4'); // Ensure '1-4' is a valid option in your dropdown
    cy.get('#gender').select('Male');
    cy.get('#price').type('500');
    // Uncomment and ensure this field is present
    cy.get('#imageUrl').should('be.visible').type('images/darius.jpg');

    // Submit the form
    cy.get('button.submit-btn').contains('Submit').click();

    // Wait for the page to update and confirm the listing exists
    // cy.get('#listingsTable', { timeout: 20000 }).contains('Buddy').should('exist');
  });

  it('should navigate to create.html and add a new pet listing', () => {
    cy.visit(baseUrl + '/create.html');

    // Wait for elements to be visible
    cy.get('#name', { timeout: 20000 }).should('be.visible').type('Buddy');
    cy.get('#type').select('Dog');
    cy.get('#breed').select('Golden Retriever');
    cy.get('#age').select('1-4'); // Ensure '1-4' is a valid option in your dropdown
    cy.get('#gender').select('Male');
    cy.get('#price').type('500');
    // Uncomment and ensure this field is present


    // Submit the form
    cy.get('button.submit-btn').contains('Submit').click();

    cy.get('#message')
      .should('be.visible') // Ensure the message is visible
      .and('have.text', 'All fields are required!'); // Check the error message text
    // Assert that the message has the "text-danger" class
    cy.get('#message')
      .should('have.class', 'text-danger');

    // Wait for the page to update and confirm the listing exists
    // cy.get('#listingsTable', { timeout: 20000 }).contains('Buddy').should('exist');
  });

});