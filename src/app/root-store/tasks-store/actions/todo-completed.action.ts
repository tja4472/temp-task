import { createAction, props } from '@ngrx/store';

import { CompletedTask } from '../models';

export const databaseListenForDataStart = createAction(
  '[TodoCompleted] (Database) Listen For Data - Start',
  props<{
    todoListId: string;
    userId: string;
  }>()
);

export const databaseListenForDataStop = createAction(
  '[TodoCompleted] (Database) Listen For Data - Stop'
);

export const loadSuccess = createAction(
  '[TodoCompleted] Load Success',
  props<{
    completedTasks: CompletedTask[];
  }>()
);
