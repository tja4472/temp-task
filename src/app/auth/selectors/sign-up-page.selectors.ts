import { createSelector } from '@ngrx/store';

import { AuthFeatureState, selectAuthFeatureState } from '@app/auth/reducers';
import { SignUpPageState } from '@app/auth/reducers/sign-up-page.reducer';

const selectSignUpPageState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.signUpPage
);

export const selectSignUpPageError = createSelector(
  selectSignUpPageState,
  (state: SignUpPageState) => state.error
);

export const selectSignUpPagePending = createSelector(
  selectSignUpPageState,
  (state: SignUpPageState) => state.pending
);
