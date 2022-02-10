import { createAction, props } from '@ngrx/store';

const title = 'Task Lists Page';

export const enter = createAction(`[${title}]  Enter`);

export const newTaskList = createAction(`[${title}]  New Task List`);
