import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  take,
  tap,
  timeout,
} from 'rxjs/operators';

import { RootState } from '@app/root-store/reducers';
import {
  TaskListSelectors,
  TaskSelectors,
} from '@app/root-store/tasks-store/selectors';

import { TaskListDetailEditPageComponentGuardActions } from '../actions';

// We don't want load component unless the task list exists
// in the Store.
@Injectable({
  providedIn: 'root',
})
export class TaskListDetailEditPageComponentGuard implements CanActivate {
  constructor(private store: Store<RootState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.waitForTaskListsToLoad().pipe(
      timeout(5000),
      switchMap(() => {
        return this.hasTaskListInStore();
      }),
      catchError((err) => of(false))
    );
  }

  private hasTaskListInStore(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectTaskListFromRoute),
      map((todo) => todo !== undefined),
      tap((x) => {
        if (x === false) {
          this.store.dispatch(
            TaskListDetailEditPageComponentGuardActions.taskListNotFound()
          );
          this.router.navigate(['/404'], { skipLocationChange: true });
        }
      }),
      take(1)
    );
  }

  private waitForTaskListsToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(TaskListSelectors.selectLoaded),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
