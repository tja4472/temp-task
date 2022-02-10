import { createAction, props } from '@ngrx/store';

import { TaskListListItem } from '../models';

const title = 'Task List Store';

export const listenForData = createAction(
  `[${title}] Listen For Data`,
  props<{
    userId: string;
  }>()
);

export const loadSuccess = createAction(
  `[${title}] Load Success`,
  props<{
    items: TaskListListItem[];
  }>()
);
