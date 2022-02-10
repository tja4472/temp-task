import { createAction } from '@ngrx/store';

const title = 'Task Lists Root';

export const destroyed = createAction(`[${title}] Destroyed`);
