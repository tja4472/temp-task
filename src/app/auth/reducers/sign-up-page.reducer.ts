import { createReducer, on } from '@ngrx/store';

import { AuthApiActions, SignUpPageActions } from '@app/auth/actions';

export const signUpPageReducerKey = 'signUpPage';

export interface SignUpPageState {
  readonly pending: boolean;
  readonly error: string | null;
}

export const initialState: SignUpPageState = {
  pending: false,
  error: null,
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
export const signUpPageReducer = createReducer(
  initialState,
  on(SignUpPageActions.entered, (): SignUpPageState => ({ ...initialState })),
  on(
    SignUpPageActions.signUp,
    (state): SignUpPageState => ({ ...state, error: null, pending: true })
  ),
  on(
    AuthApiActions.signUpFailure,
    (state, { error }): SignUpPageState => ({
      ...state,
      error: error.message,
      pending: false,
    })
  )
);
