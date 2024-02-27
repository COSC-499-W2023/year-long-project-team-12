// cypress/integration/app_spec.js
describe('App Routes', () => {
    it('Navigates to the home page', () => {
      cy.visit('/');
      cy.contains('Home Page').should('exist');
    });
  
   
  
  
  });
  