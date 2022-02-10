import { Action, createReducer, on } from '@ngrx/store';

export const homeFeatureKey = 'home';

// tslint:disable-next-line: no-empty-interface
export interface State {}

export const initialState: State = {};

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
  initialState

  // on(HomeActions.qqqqloadHomes, (state) => state)
);
