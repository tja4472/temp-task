import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { UserStoreSelectors } from '@app/root-store/user-store';

import { CompletedTaskDataService } from '../../../services/completed-task.data.service';
import {
  CompletedTasksRootActions,
  CompletedTasksRootGuardServiceActions,
  TodoCompletedActions,
} from '../actions';
import { CompletedTask } from '../models';

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
export class TodoCompletedEffects {
  listenForData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompletedTasksRootGuardServiceActions.loadData),
      switchMap(() =>
        this.store.select(UserStoreSelectors.selectUserAndTaskListId).pipe(
          switchMap((a) => {
            if (a === null || a.taskListId === null) {
              const result: CompletedTask[] = [];
              return of(result);
            }
            return this.dataService.getData(a.taskListId, a.user.id);
          }),
          takeUntil(
            this.actions$.pipe(ofType(CompletedTasksRootActions.destroyed))
          )
        )
      ),
      map((items: CompletedTask[]) =>
        TodoCompletedActions.loadSuccess({ completedTasks: items })
      )
    );
  });

  constructor(
    private actions$: Actions,
    private dataService: CompletedTaskDataService,
    private store: Store<{}>
  ) {}
}
