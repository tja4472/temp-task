import { createAction, props } from '@ngrx/store';

const title = 'Auth Guard Service';

export const navigateToSignIn = createAction(
  `[${title}] Navigate To Sign In`,
  props<{ requestedUrl: string }>()
);
