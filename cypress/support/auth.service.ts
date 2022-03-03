const SERVICE_NAME = 'AuthService';

export const getService = () =>
  cy.window().should('have.property', SERVICE_NAME);

export const signIn = (email: string, password: string) =>
  cy.window().its(SERVICE_NAME).invoke('signInCypress', email, password);

export const signOut = () =>
  cy.window().its(SERVICE_NAME).invoke('signOutCypress');

export const signUp = (email: string, password: string) =>
  cy.window().its(SERVICE_NAME).invoke('signUpCypress', email, password);
