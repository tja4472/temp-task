import { clearDatabase, clearUserAccounts } from 'emulator/emulator-helpers';

const user = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

describe('test', () => {
  beforeEach(async () => {
    // Runs before every test block
    cy.viewport('ipad-2', 'landscape');
    await clearDatabase('demo-1');
    await clearUserAccounts('demo-1');
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
    cy.getBySel('sidenav-sign-in-component-store').click();
    //
    cy.getBySel('sign-up-button').should('be.visible');
    cy.getBySel('sidenav-current-tasks').click();
    // Current tasks page
    cy.location('pathname').should('eq', '/tasks/current');
    cy.getBySel('new-task-fab').should('be.visible');
    cy.getBySel('sidenav-completed-tasks').click();
    // Completed Tasks page
    cy.location('pathname').should('eq', '/tasks/completed');
    cy.getBySel('search-field').should('be.visible');
    cy.getBySel('sidenav-task-lists').click();
    // Task Lists page
    cy.location('pathname').should('eq', '/tasks/lists');
    cy.getBySel('task-lists-page').should('be.visible');
    cy.getBySel('sidenav-current-tasks').click();
    // Current tasks page
    cy.getBySel('new-task-fab').should('be.visible').click();
    // New Current Task page
    cy.location('pathname').should('eq', '/tasks/current/new');
    cy.get('#name').type('First task');
    cy.get('#description').type('First task description');
    cy.get('.mat-card-actions > .mat-primary').click();
    // Current tasks page
    cy.location('pathname').should('eq', '/tasks/current');
    cy.getBySel('new-task-fab').should('be.visible').click();
    // New Current Task page
    cy.location('pathname').should('eq', '/tasks/current/new');
    cy.get('#name').type('Second task');
    cy.get('#description').type('Second task description');
    cy.get('.mat-card-actions > .mat-primary').click();
    //
    // https://medium.com/slido-dev-blog/cypress-tips-4-testing-lists-of-items-dccd4b688816
    cy.getBySel('list-item').should('have.length', 2);
    cy.getBySel('item-name').should('have.length', 2);    
    cy.getBySel('list-item').then(items => {

    });    
    cy.getBySel('item-name').eq(0).click();
   
    cy.location('pathname').should('match', /^\/tasks\/current\/edit/); 

  });
});
