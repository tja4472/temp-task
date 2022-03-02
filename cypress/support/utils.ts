export function login() {
  // cy.login(Cypress.env('TEST_UID'));
  cy.login('UID-1');
}

export function logout() {
  cy.logout();
}

// https://github.com/prescottprue/cypress-firebase/issues/14#issuecomment-744167897

/**
 * @see: https://firebase.google.com/docs/reference/rest/auth#section-auth-emulator-clearaccounts
 */
/*
export function clearUserAccounts1(projectId: string) {
  return cy.request({
    url: 'http://localhost:9099/emulator/v1/projects/{projectId}/accounts',
    method: 'DELETE',
    // auth: { bearer: 'owner' },    
  });
}
*/
