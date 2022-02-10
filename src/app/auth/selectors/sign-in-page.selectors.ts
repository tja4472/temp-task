import { createSelector } from '@ngrx/store';

import { AuthFeatureState, selectAuthFeatureState } from '@app/auth/reducers';
import { SignInPageState } from '@app/auth/reducers/sign-in-page.reducer';

const selectSignInPageState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.signInPage
);

export const selectSignInPageError = createSelector(
  selectSignInPageState,
  (state: SignInPageState) => state.error
);

export const selectSignInPagePending = createSelector(
  selectSignInPageState,
  (state: SignInPageState) => state.pending
);
