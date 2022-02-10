import { createAction, props } from '@ngrx/store';

const title = 'Task Lists Guard';

export const timeout = createAction(
  `[${title}] Timeout`,
  props<{ requestedUrl: string }>()
);
