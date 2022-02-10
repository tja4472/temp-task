import { createAction } from '@ngrx/store';

const title = 'Auth';

export const signOut = createAction(`[${title}]  Sign Out`);

export const signOutComplete = createAction(`[${title}]  Sign Out - Complete`);

export const signOutConfirmation = createAction(
  `[${title}]  Sign Out Confirmation`
);

export const signOutConfirmationDismiss = createAction(
  `[${title}]  Sign Out Confirmation Dismiss`
);
