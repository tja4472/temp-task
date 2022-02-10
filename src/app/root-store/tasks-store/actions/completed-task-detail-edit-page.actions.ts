import { createAction, props } from '@ngrx/store';

import { CompletedTask } from '@app/root-store/tasks-store/models';

const title = 'Completed Task Detail Edit Page';

export const cancelled = createAction(
  `[${title}] Cancelled`,
  props<{ completedTask: CompletedTask }>()
);

export const removed = createAction(
  `[${title}] Removed`,
  props<{ completedTask: CompletedTask }>()
);

export const saved = createAction(
  `[${title}] Saved`,
  props<{ completedTask: CompletedTask }>()
);
