// This is the starting point of a test suite.
// The describe our test suite named "template spec".
describe('template spec', () => {

  //Inside the describe block, there's an it block. This represents an individual test case. 
  //The it function is used to define a specific test case with a description. 
  //In this case, the test case is named "passes".
  it('passes', () => {

    //This line uses the cy.visit() command provided by Cypress to navigate to the 
    //URL "https://example.cypress.io". It simulates a user visiting a web page.
    cy.visit('https://example.cypress.io')

    //This line uses the cy.get() command to select an HTML element on the page using the CSS selector format. 
    //In this case, it selects the <h1> element. The .should() command is used to make an 
    //assertion about the selected element. 
    //It asserts that the selected <h1> element should have the text content "Kitchen Sink". 
    cy.get('h1').should('have.text', 'Kitchen Sink')
  })
})