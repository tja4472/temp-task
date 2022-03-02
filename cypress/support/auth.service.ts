const SERVICE_NAME = 'AuthService';

export const getService = () =>
  cy.window().should('have.property', SERVICE_NAME);

export const signUp = (email: string, password: string) =>
  cy.window().its(SERVICE_NAME).invoke('signUp', email, password);
