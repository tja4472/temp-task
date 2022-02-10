import { createAction, props } from '@ngrx/store';

const title = 'Sidenav';

export const selectTaskListId = createAction(
  `[${title}] Select Task List Id`,
  props<{ taskListId: string }>()
);
