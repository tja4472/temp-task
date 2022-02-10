import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

import { TaskSelectors } from '@app/root-store/tasks-store/selectors';
import { UserStoreSelectors } from '@app/root-store/user-store';

import { CompletedTasksRootGuardServiceActions } from '../root-store/tasks-store/actions';
@Injectable({
  providedIn: 'root',
})
export class CompletedTasksRootGuardService implements CanActivate {
  constructor(private store: Store<{}>) {}

  canActivate(): Observable<boolean> {
    return this.waitForAuth().pipe(
      // tap(() => console.log('waitForAuth - complete')),
      switchMap(() =>
        this.waitForCompletedTasksToLoad().pipe(
          // tap(() => console.log('waitForCompletedTasksToLoad - complete')),
          switchMap(() => of(true))
        )
      )
    );
  }

  private waitForAuth() {
    return this.store.pipe(
      select(UserStoreSelectors.selectUser),
      filter((user) => !!user),
      first()
    );
  }

  private waitForCompletedTasksToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectCompletedTasksLoaded),
      tap((loaded) => {
        // console.log('waitForCompletedTasksToLoad>loaded>', loaded);
        if (!loaded) {
          this.store.dispatch(CompletedTasksRootGuardServiceActions.loadData());
        }
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
