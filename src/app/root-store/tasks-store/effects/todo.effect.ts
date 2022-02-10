import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import {
  concatMap,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { UserStoreSelectors } from '@app/root-store/user-store';

import { CurrentTaskDataService } from '../../../services/current-task.data.service';
import {
  CurrentTasksRootActions,
  CurrentTasksRootGuardServiceActions,
  TodoActions,
} from '../actions';
import { CurrentTask } from '../models';

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
export class TodoEffects {
  listenForData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrentTasksRootGuardServiceActions.loadData),
      switchMap(() =>
        this.store.select(UserStoreSelectors.selectUserAndTaskListId).pipe(
          switchMap((a) => {
            if (a === null || a.taskListId === null) {
              const result: CurrentTask[] = [];
              return of(result);
            }
            return this.dataService.getData$(a.taskListId, a.user.id);
          }),
          takeUntil(
            this.actions$.pipe(ofType(CurrentTasksRootActions.destroyed))
          )
        )
      ),
      map((items: CurrentTask[]) =>
        TodoActions.loadSuccess({ currentTasks: items })
      )
    );
  });

  reorderList$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TodoActions.reorderList),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(UserStoreSelectors.selectUserAndTaskListId)
            )
          )
        ),
        tap(([action, a]) => {
          if (a === null || a.taskListId === null) {
            return;
          }
          this.dataService.reorderItems(action.ids, a.taskListId, a.user.id);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<{}>,
    private dataService: CurrentTaskDataService
  ) {}
}
