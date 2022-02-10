import { createReducer, on } from '@ngrx/store';

import { AuthActions, AuthApiActions } from '../actions';

export const authReducerKey = 'auth';

export interface AuthState {
  hasChecked: boolean;
  isAutoSignIn: boolean;
  userId: string | null;
}

export const initialState: AuthState = {
  hasChecked: false,
  isAutoSignIn: true,
  userId: null,
};

/*
Typescript not enforcing State type.
https://github.com/microsoft/TypeScript/issues/241#issuecomment-540168588

const values: State = {
  ...state,
  loaded: true,
  loading: false,
};
*/
/*
Automatic type checking for the state that is returned by the on function in createReducer
https://github.com/ngrx/platform/issues/2412
*/
export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.signOutComplete,
    (state): AuthState => ({ ...state, userId: null })
  ),
  on(
    AuthApiActions.signInNoUser,
    (_, { isAutoSignIn }): AuthState => ({
      ...initialState,
      hasChecked: true,
      isAutoSignIn,
    })
  ),
  on(
    AuthApiActions.signInHaveUser,
    (state, { appUser, isAutoSignIn }): AuthState => ({
      ...state,
      hasChecked: true,
      userId: appUser.uid,
      isAutoSignIn,
    })
  )
);
