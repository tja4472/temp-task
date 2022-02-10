import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, filter, take, timeout } from 'rxjs/operators';

import { RootState } from '@app/root-store/reducers';
import { TaskListSelectors } from '@app/root-store/tasks-store/selectors';

import { TaskListsGuardActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class TaskListsGuard implements CanLoad {
  constructor(private store: Store<RootState>) {}

  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;
    // console.log('#### canLoad>', url);

    return this.store.pipe(
      timeout(5000),
      select(TaskListSelectors.selectLoaded),
      filter((loaded) => loaded),

      take(1),
      catchError((err) => {
        this.store.dispatch(
          TaskListsGuardActions.timeout({ requestedUrl: url })
        );
        return of(false);
      })
    );
  }
}
