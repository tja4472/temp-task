import { Action, createReducer } from '@ngrx/store';

import { AuthApiActions } from '@app/auth/actions';
import { SidenavActions } from '@app/core/components/sidenav/actions';

import * as featureActions from './actions';
import { initialState, State } from './state';

import { mutableOn } from 'ngrx-etc';

export const featureKey = 'user';

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
  /*
  on(featureActions.clearUser, (state) => {
    const values: State = { ...initialState };
    return values;
  }),
*/

  /*
  mutableOn(featureActions.setData, (state, { user, taskListId }) => {
    state.user = user;
    state.taskListId = taskListId;
  }),
  */
  mutableOn(SidenavActions.selectTaskListId, (state, { taskListId }) => {
    /*
    const values: State = { ...state, taskListId };
    return values;
*/

    state.taskListId = taskListId;
  }),
  mutableOn(AuthApiActions.signInHaveUser, (state, { appUser }) => {
    state.user = {
      email: appUser.email,
      id: appUser.uid,
    };
    state.taskListId = appUser.taskListId;
  })
);
