import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { RootState } from '@app/root-store/reducers';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

import { CurrentTaskDetailEditPageComponentGuardActions } from '../actions';

// We don't want load component unless the task exists
// in the Store.
@Injectable({
  providedIn: 'root',
})
export class CurrentTaskDetailEditPageComponentGuard implements CanActivate {
  constructor(private store: Store<RootState>, private router: Router) {}

  /*
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCurrentTasksToLoad().pipe(
      switchMap(() => this.hasCurrentTask())
    );
  }
*/
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasCurrentTask();
  }

  private hasCurrentTask(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectCurrentTaskFromRoute),
      map((todo) => todo !== undefined),
      tap((x) => {
        if (x === false) {
          // throw action Current Task not found
          console.log('hasCurrentTask>', x);
          this.store.dispatch(
            CurrentTaskDetailEditPageComponentGuardActions.currentTaskNotFound()
          );
          this.router.navigate(['/404'], { skipLocationChange: true });
        }
      }),
      take(1)
    );
  }

  private waitForCurrentTasksToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectCurrentTasksLoaded),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
