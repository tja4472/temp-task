import { createAction } from '@ngrx/store';

const title = 'Completed Tasks Root Guard Service';

export const loadData = createAction(`[${title}] Load data`);
