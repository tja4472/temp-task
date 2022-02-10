import { createAction, props } from '@ngrx/store';

const title = 'Completed Task Detail Edit Page Component Guard';

export const completedTaskNotFound = createAction(
  `[${title}] Completed Task Not Found`
);
