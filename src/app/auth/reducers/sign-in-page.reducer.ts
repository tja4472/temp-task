import { createReducer, on } from '@ngrx/store';

import { AuthApiActions, SignInPageActions } from '../actions';

export const signInPageReducerKey = 'signInPage';

export interface SignInPageState {
  pending: boolean;
  error: string | null;
}

export const initialState: SignInPageState = {
  error: null,
  pending: false,
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
export const signInPageReducer = createReducer(
  initialState,
  on(SignInPageActions.entered, (): SignInPageState => ({ ...initialState })),
  on(
    SignInPageActions.signIn,
    (state): SignInPageState => ({ ...state, error: null, pending: true })
  ),
  on(
    AuthApiActions.signInFailure,
    (state, { error }): SignInPageState => ({
      ...state,
      error: error.message,
      pending: false,
    })
  )
);
