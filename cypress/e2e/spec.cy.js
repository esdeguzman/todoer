describe("todo list", () => {
  it("shows the login page", () => {
    cy.visit("http://localhost:3000");

    //This Cypress code finds an <input> element with the attribute type set to "email" and checks 
    //if it has an empty text value using the .should("have.text", "") assertion.
    cy.get("input[type=email]").should("have.text", "");

    cy.get("input[type=password]").then((elem) => {

      //Do other tasks

      //Here we use Chai expect() instead of .should since the elem is now a JQuery object
      //This is the same as cy.get("input[type=password]").should("have.text", "");
      expect(elem).to.have.text("");
      //If you want to use .should here, you can use the .wrap command like so,
      //cy.wrap(elem).should("have.text", "");
    })

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

  it('can add new todo item', () => {
    cy.visit("http://localhost:3000");
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

    cy.get("button").click();

    cy.get('#title').type('Test todo')
    cy.get('.add-btn').click()
  })

  it('can see completed todos', () => {
    cy.visit("http://localhost:3000");
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

    cy.get("button").click();
    cy.get('[name=todoFilter]').wait(1000).select('completed')
  })

  it('can see hidden todos', () => {
    cy.visit("http://localhost:3000");
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

    cy.get("button").click();
    cy.get('[name=todoFilter]').wait(1000).select('hidden')
  })
});
