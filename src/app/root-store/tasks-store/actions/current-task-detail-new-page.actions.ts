import { createAction, props } from '@ngrx/store';

import { CurrentTask } from '@app/root-store/tasks-store/models';

const title = 'Current Task Detail New Page';

export const cancelled = createAction(`[${title}] Cancelled`);

export const saved = createAction(
  `[${title}] Saved`,
  props<{ currentTask: CurrentTask }>()
);
