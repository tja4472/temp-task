import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { TaskListListItem } from '../models';

export const featureAdapter: EntityAdapter<TaskListListItem> = createEntityAdapter<
  TaskListListItem
>();

export interface State extends EntityState<TaskListListItem> {
  loaded: boolean;
  loading: boolean;
}

export const initialState: State = featureAdapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
});
