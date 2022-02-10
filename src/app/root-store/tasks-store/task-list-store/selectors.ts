import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureKey } from './reducer';
import { featureAdapter, State } from './state';

const getTodoListsState = createFeatureSelector<State>(featureKey);

const { selectEntities, selectAll } = featureAdapter.getSelectors();

export const getAllTodoLists = createSelector(getTodoListsState, selectAll);

export const getEntities = createSelector(getTodoListsState, selectEntities);

export const getLoaded = createSelector(
  getTodoListsState,
  (state) => state.loaded
);
