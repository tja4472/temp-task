import { createAction } from '@ngrx/store';

const title = 'Completed Tasks Root';

export const destroyed = createAction(`[${title}] Destroyed`);
