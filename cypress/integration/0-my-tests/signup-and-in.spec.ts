import { clearDatabase, clearUserAccounts } from 'emulator/emulator-helpers';

import * as AuthService from '../../support/auth.service';

const user = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

describe('signup-and-in', () => {
  beforeEach(() => {
    // Runs before every test block
    cy.viewport('ipad-2', 'landscape');
    cy.wrap(clearDatabase('demo-1'));
    cy.wrap(clearUserAccounts('demo-1'));
  });

  it.skip('main test', () => {
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
    cy.getBySel('username-field').type(user.email);
    cy.getBySel('password-field').type(user.password);
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
    cy.getBySel('username-field').type(user.email);
    cy.getBySel('password-field').type(user.password);
    cy.getBySel('sign-in-button').click();
    // Home page
    cy.location('pathname').should('eq', '/home');
  });

  it('AuthService.signUp', () => {
    // Home page
    cy.visit('/');
    AuthService.getService();
    AuthService.signUp('d@d.d.com', 'helloWorld');
    /*
    // https://github.com/prescottprue/cypress-firebase/issues/14#issuecomment-744167897
    // createuser

    // Current Tasks page
    cy.visit('/tasks/current');
    // Sign In page
    cy.location('pathname').should('eq', '/sign-in');
    cy.getBySel('sign-up-button').should('be.visible');
    cy.getBySel('username-field').type(user.email);
    cy.getBySel('password-field').type(user.password);
    cy.getBySel('sign-in-button').click();
    // Current Tasks page
    cy.location('pathname').should('eq', '/tasks/current');
*/
  });

  it.skip('redirect', () => {
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
    cy.getBySel('username-field').type(user.email);
    cy.getBySel('password-field').type(user.password);
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
    cy.getBySel('username-field').type(user.email);
    cy.getBySel('password-field').type(user.password);
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
    cy.getBySel('username-field').type(user.email);
    cy.getBySel('password-field').type(user.password);
    cy.getBySel('sign-in-button').click();
    // Current Tasks page
    cy.location('pathname').should('eq', '/tasks/current');
  });
});
