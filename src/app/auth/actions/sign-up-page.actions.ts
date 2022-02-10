import { createAction, props } from '@ngrx/store';

import { Credentials } from '@app/auth/models/credentials.model';

const title = 'Sign Up Page';

export const entered = createAction(`[${title}] Entered`);

export const signUp = createAction(
  `[${title}] Sign Up`,
  props<{ credentials: Credentials }>()
);
