// This is the starting point of a test suite.
// The describe our test suite named "todo list".
describe("todo list", () => {
  //Inside the describe block, there's an it block. This represents an individual test case.
  //The it function is used to define a specific test case with a description.
  //In this case, the test case is named "shows the login page".
  it("shows the login page", () => {
    //This line uses the cy.visit() command provided by Cypress to navigate to the
    //URL "http://localhost:3000". It simulates a user visiting a web page.
    cy.visit("http://localhost:3000");

    //This Cypress code finds an <input> element with the attribute type set to "email" and checks 
    //if it has an empty text value using the .should("have.text", "") assertion.
    cy.get("input[type=email]").should("have.text", "");
    cy.get("input[type=password]").should("have.text", "");

    //This Cypress code finds a "button" element on the webpage and gives it an alias name "loginButton" 
    //using the .as() method. This alias can be used later in your Cypress tests to refer to this specific button element easily.
    cy.get("button").as("loginButton");

    //In this Cypress code, it retrieves the element with the alias "loginButton" that was previously 
    //set using cy.get('@loginButton'). Then, it checks if this element has the text content "Log In" 
    //using the .should("have.text", "Log In") assertion.
    cy.get('@loginButton').should("have.text", "Log In");

    //This Cypress code retrieves the element with the alias "loginButton" and checks if it is in a disabled 
    //state using the .should('be.disabled') assertion.
    cy.get('@loginButton').should('be.disabled')
  });

  it("can log in user", () => {
    cy.visit("http://localhost:3000");

    //This Cypress code finds an <input> element with the attribute type set to "email" and simulates typing the 
    //text "test@mail.test" into this input field using the .type() method.
    //More examples here https://docs.cypress.io/api/commands/type#Syntax
    cy.get("input[type=email]").type("test@mail.test");
    cy.get("input[type=password]").type("pasword");

    //To add comment for later chapter
    cy.intercept("POST", "/api/users", {
      name: "Esme",
      email: "test@mail.test",
      password: "password",
      session_token: "7ec26adf-e9a5-44f2-af35-2737f702cfec",
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    });

    //This Cypress code finds a "button" element on the webpage and simulates a click action on it using the .click() method.
    //See https://docs.cypress.io/api/commands/click#Syntax for more details.
    cy.get("button").click();

    //This Cypress code searches for an element containing the text "Esme" on the webpage using the .contains() method. 
    //It's used to locate an element that has the specified text content.
    //Checkout https://docs.cypress.io/api/commands/contains#Syntax for more info.
    cy.contains("Esme");
  });
});
