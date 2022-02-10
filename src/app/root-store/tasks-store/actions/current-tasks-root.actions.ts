import { createAction } from '@ngrx/store';

const title = 'Current Tasks Root';

export const destroyed = createAction(`[${title}] Destroyed`);
