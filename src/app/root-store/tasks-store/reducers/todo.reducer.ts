import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { CurrentTasksRootActions, TodoActions } from '../actions';
import { CurrentTask } from '../models';

export const todoFeatureKey = 'todo';

export interface State extends EntityState<CurrentTask> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<CurrentTask> = createEntityAdapter<
  CurrentTask
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
});

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
    TodoActions.databaseListenForDataStart,
    (state): State => ({ ...state, loading: true })
  ),
  on(
    TodoActions.databaseListenForDataStop,
    CurrentTasksRootActions.destroyed,
    (): State => ({ ...initialState })
  ),
  on(
    TodoActions.loadSuccess,
    (state, { currentTasks }): State => {
      const values: State = {
        ...state,
        loaded: true,
        loading: false,
      };

      return adapter.setAll(currentTasks, values);
    }
  ),
  on(TodoActions.reorderList, (state, { ids }): State => ({ ...state, ids }))
);
