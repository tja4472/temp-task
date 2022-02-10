import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import { AuthActions } from '@app/auth/actions';

import { HomePageActions } from '../actions';

/* =======================================
Improve typings of createEffect, help debugging
https://github.com/ngrx/platform/issues/2192

effect$ = createEffect(() => {
  return this.actions$.pipe(
    ...
  );
});

effectDispatchFalse$ = createEffect(
  () => {
    return this.actions$.pipe(
      ...
    );
  },
  { dispatch: false }
);
======================================= */

@Injectable()
export class HomeEffects {
  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomePageActions.signOut),
      map(() => AuthActions.signOutConfirmation())
    );
  });

  constructor(private actions$: Actions) {}
}
