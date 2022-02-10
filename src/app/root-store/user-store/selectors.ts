import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureKey } from './reducer';
import { State } from './state';

const getFeatureState = createFeatureSelector<State>(featureKey);

export const selectTaskListId = createSelector(
  getFeatureState,
  (state) => state.taskListId
);

export const selectUser = createSelector(
  getFeatureState,
  (state) => state.user
);

export const selectIsLoggedIn = createSelector(selectUser, (user) => !!user);

export const selectUserAndTaskListId = createSelector(
  selectUser,
  selectTaskListId,
  (user, taskListId) => {
    if (user === null) {
      return null;
    } else {
      return { user, taskListId };
    }
  }
);
