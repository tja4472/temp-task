import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import {
  CompletedTasksPageActions,
  CompletedTasksRootActions,
  TodoCompletedActions,
} from '../actions';
import { CompletedTask } from '../models';

export const todoCompletedFeatureKey = 'todo-completed';

export interface State extends EntityState<CompletedTask> {
  loaded: boolean;
  loading: boolean;
  query: string;
}

export const adapter: EntityAdapter<CompletedTask> = createEntityAdapter<
  CompletedTask
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
  query: '',
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
    CompletedTasksPageActions.search,
    (state, { query }): State => {
      const lowerCaseQuery = query.toLowerCase();
      return { ...state, query: lowerCaseQuery };
    }
  ),
  on(
    TodoCompletedActions.databaseListenForDataStart,
    (state): State => ({
      ...state,
      loading: true,
    })
  ),
  on(
    TodoCompletedActions.databaseListenForDataStop,
    CompletedTasksRootActions.destroyed,
    (): State => ({
      ...initialState,
    })
  ),
  on(
    TodoCompletedActions.loadSuccess,
    (state, { completedTasks }): State => {
      const values: State = {
        ...state,
        loaded: true,
        loading: false,
      };

      return adapter.setAll(completedTasks, values);
    }
  )
);
