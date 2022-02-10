import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

import { AuthActions, AuthApiActions } from '@app/auth/actions';
import {
  UserStoreActions,
  UserStoreSelectors,
} from '@app/root-store/user-store';
import { TaskListDataService } from '@app/services/task-list.data.service';

import * as featureActions from './actions';

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
export class TaskListEffects {
  authListenForAuthSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.signInHaveUser),
      map((action) =>
        featureActions.listenForData({ userId: action.appUser.uid })
      )
    );
  });

  listenForData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(featureActions.listenForData),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(UserStoreSelectors.selectUser))
        )
      ),
      map(([_, user]) => user),
      filter((user) => user !== null),
      switchMap((user) => {
        if (user == null) {
          return of([]);
        }
        return this.dataService
          .getData(user.id)
          .pipe(
            takeUntil(this.actions$.pipe(ofType(AuthActions.signOutComplete)))
          );
      }),
      map((items) => featureActions.loadSuccess({ items }))
    );
  });

  constructor(
    private actions$: Actions,
    private dataService: TaskListDataService,
    private store: Store<{}>
  ) {}
}
