import { createFeatureSelector, createSelector } from '@ngrx/store';

import { taskFeatureKey, TaskState } from '../reducers';
import { TaskListSelectors } from '../task-list-store';

const getTaskState = createFeatureSelector<TaskState>(taskFeatureKey);

export const selectAll = createSelector(
  getTaskState,
  TaskListSelectors.getAllTodoLists
);

export const selectEntities = createSelector(
  getTaskState,
  TaskListSelectors.getEntities
);

export const selectLoaded = createSelector(
  getTaskState,
  TaskListSelectors.getLoaded
);
