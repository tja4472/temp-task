import { createAction, props } from '@ngrx/store';

import { CurrentTask } from '@app/root-store/tasks-store/models';

const title = 'Current Tasks Page';

export const enter = createAction(`[${title}] Enter`);

export const clearCompleted = createAction(`[${title}] Clear Completed`);

export const newCurrentTask = createAction(`${title}] New Current Task`);

export const saveItem = createAction(
  `[${title}] Save Item`,
  props<{ currentTask: CurrentTask }>()
);
