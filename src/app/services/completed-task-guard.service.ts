import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Injectable({
  providedIn: 'root',
})
export class CompletedTaskGuardService implements CanActivate {
  constructor(private store: Store<{}>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCompletedTasksToLoad().pipe(
      switchMap(() => this.hasCompletedTask())
    );
  }

  private hasCompletedTask(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectCompletedTaskFromRoute),
      map((todo) => todo !== undefined),
      take(1)
    );
  }

  private waitForCompletedTasksToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectCompletedTasksLoaded),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
