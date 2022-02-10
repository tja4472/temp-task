import { createAction, props } from '@ngrx/store';

import { CompletedTask } from '@app/root-store/tasks-store/models';

const title = 'Completed Tasks Page';

export const itemToggled = createAction(
  `[${title}] Item Toggled`,
  props<{ todoCompleted: CompletedTask }>()
);

export const search = createAction(
  `[${title}] Search`,
  props<{ query: string }>()
);
