import { createAction, props } from '@ngrx/store';

import { CurrentTask } from '@app/root-store/tasks-store/models';

export const databaseListenForDataStart = createAction(
  '[Todo] (Database) Listen For Data - Start',
  props<{
    todoListId: string;
    userId: string;
  }>()
);

export const databaseListenForDataStop = createAction(
  '[Todo] (Database) Listen For Data - Stop'
);

export const loadSuccess = createAction(
  '[Todo] Load Success',
  props<{
    currentTasks: CurrentTask[];
  }>()
);

export const reorderList = createAction(
  '[Todo] Reorder List',
  props<{
    ids: string[];
  }>()
);
