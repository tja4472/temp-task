import { clearDatabase, clearUserAccounts } from 'emulator/emulator-helpers';

import * as AuthService from '../../support/auth.service';

const userC = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

const userD = {
  email: 'd.d@d.com',
  password: 'helloWorld',
} as const;

describe.skip('signup-and-in', () => {
  beforeEach(() => {
    // Runs before every test block
    cy.viewport('ipad-2', 'landscape');
    cy.wrap(clearDatabase('demo-1'));
    cy.wrap(clearUserAccounts('demo-1'));
  });

  it('main test', () => {
    // Home page
    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
    cy.getBySel('sidenav-sign-in').click();
    // Sign In page
    cy.location('pathname').should('eq', '/sign-in');
    cy.getBySel('sign-up-button').should('be.visible');
    cy.getBySel('sign-up-button').click();
    // Sign Up page
    cy.location('pathname').should('eq', '/sign-up');
    cy.getBySel('sign-up-button').should('be.visible').and('be.disabled');
    cy.getBySel('username-field').type(userC.email);
    cy.getBySel('password-field').type(userC.password);
    cy.getBySel('sign-up-button').click();
    // Home page
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
    cy.getBySel('sign-out-button').click();
    // Dialog
    cy.getBySel('ok-button').click();
    // Sign In page
    cy.location('pathname').should('eq', '/sign-in');
    cy.getBySel('sign-up-button').should('be.visible');
    cy.getBySel('username-field').type(userC.email);
    cy.getBySel('password-field').type(userC.password);
    cy.getBySel('sign-in-button').click();
    // Home page
    cy.location('pathname').should('eq', '/home');
  });

  it('redirect', () => {
    // cy.login('test-login');
    // Home page
    cy.visit('/');

    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
    cy.getBySel('sidenav-sign-in').click();
    // Sign In page
    cy.location('pathname').should('eq', '/sign-in');
    cy.getBySel('sign-up-button').should('be.visible');
    cy.getBySel('sign-up-button').click();
    // Sign Up page
    cy.location('pathname').should('eq', '/sign-up');
    cy.getBySel('sign-up-button').should('be.visible').and('be.disabled');
    cy.getBySel('username-field').type(userC.email);
    cy.getBySel('password-field').type(userC.password);
    cy.getBySel('sign-up-button').click();
    // Home page
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
    cy.getBySel('sign-out-button').click();
    // Dialog
    cy.getBySel('ok-button').click();
    // Sign In page
    cy.location('pathname').should('eq', '/sign-in');
    cy.getBySel('sign-up-button').should('be.visible');
    cy.getBySel('username-field').type(userC.email);
    cy.getBySel('password-field').type(userC.password);
    cy.getBySel('sign-in-button').click();
    // Home page
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
    cy.getBySel('sign-out-button').click();
    // Dialog
    cy.getBySel('ok-button').click();
    // Sign In page
    cy.location('pathname').should('eq', '/sign-in');
    // Current Tasks page
    cy.visit('/tasks/current');
    // Sign In page
    cy.location('pathname').should('eq', '/sign-in');
    cy.getBySel('sign-up-button').should('be.visible');
    cy.getBySel('username-field').type(userC.email);
    cy.getBySel('password-field').type(userC.password);
    cy.getBySel('sign-in-button').click();
    // Current Tasks page
    cy.location('pathname').should('eq', '/tasks/current');
  });
});
