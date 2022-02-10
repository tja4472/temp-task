import { createAction } from '@ngrx/store';

const title = 'Current Tasks Root Guard Service';

export const loadData = createAction(`[${title}] Load data`);
