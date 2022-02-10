import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodoCompleted from '../reducers/todo-completed.reducer';

const getTodoCompletedState = createFeatureSelector<fromTodoCompleted.State>(
  fromTodoCompleted.todoCompletedFeatureKey
);

const { selectEntities, selectAll } = fromTodoCompleted.adapter.getSelectors();

export const getAllTodoCompleted = createSelector(
  getTodoCompletedState,
  selectAll
);

export const getEntities = createSelector(
  getTodoCompletedState,
  selectEntities
);

export const getLoaded = createSelector(
  getTodoCompletedState,
  (state) => state.loaded
);

export const getQuery = createSelector(
  getTodoCompletedState,
  (state) => state.query
);
