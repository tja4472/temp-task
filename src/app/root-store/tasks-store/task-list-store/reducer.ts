import { Action, createReducer, on } from '@ngrx/store';

import { AuthApiActions } from '@app/auth/actions';

import * as featureActions from './actions';
import { featureAdapter, initialState, State } from './state';

export const featureKey = 'taskLists';

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
export const reducer = createReducer(
  initialState,
  on(
    featureActions.listenForData,
    (state): State => ({
      ...state,
      loading: true,
    })
  ),
  /*
  on(AuthApiActions.signOutComplete, () => ({
    ...initialState,
  })),
*/

  on(
    featureActions.loadSuccess,
    (state, { items }): State => {
      const values: State = {
        ...state,
        loaded: true,
        loading: false,
      };
      return featureAdapter.setAll(items, values);
    }
  )
);
