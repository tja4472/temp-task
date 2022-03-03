import { clearDatabase, clearUserAccounts } from 'emulator/emulator-helpers';

import * as AuthService from '../support/auth.service';

const userD = {
  email: 'd.d@d.com',
  password: 'helloWorld',
} as const;

describe('AuthService', () => {
  it('all methods', () => {
    cy.viewport('ipad-2', 'landscape');
    cy.wrap(clearDatabase('demo-1'));
    cy.wrap(clearUserAccounts('demo-1'));
    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'Not Signed In');
    AuthService.getService();
    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'Not Signed In');
    AuthService.signUp(userD.email, userD.password);
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', userD.email);
    AuthService.signOut();
    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'Not Signed In');
  });

  it('start signed up', () => {
    cy.viewport('ipad-2', 'landscape');
    cy.wrap(clearDatabase('demo-1'));
    cy.wrap(clearUserAccounts('demo-1'));
    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'Not Signed In');
    AuthService.getService();
    AuthService.signUp(userD.email, userD.password);
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', userD.email);
    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', userD.email);    
  });
});
