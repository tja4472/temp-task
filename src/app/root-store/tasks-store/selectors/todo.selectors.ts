import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodo from '../reducers/todo.reducer';

const getTodoState = createFeatureSelector<fromTodo.State>(
  fromTodo.todoFeatureKey
);

const { selectEntities, selectAll } = fromTodo.adapter.getSelectors();

export const getAllTodo = createSelector(getTodoState, selectAll);

export const getEntities = createSelector(getTodoState, selectEntities);

export const getLoaded = createSelector(getTodoState, (state) => state.loaded);
