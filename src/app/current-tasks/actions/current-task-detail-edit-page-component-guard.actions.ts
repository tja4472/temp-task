import { createAction, props } from '@ngrx/store';

const title = 'Current Task Detail Edit Page Component Guard';

export const currentTaskNotFound = createAction(
  `[${title}] Current Task Not Found`
);
