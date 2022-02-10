import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
} from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { exhaustMap, filter, map, take } from 'rxjs/operators';

import { selectHasChecked, selectHasUser } from '..//selectors/auth.selectors';
import { AuthGuardServiceActions } from '../actions';
import { AuthRootState } from '../reducers';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private store: Store<AuthRootState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    //
    return this.checkAuth(state.url);
  }

  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;
    return this.checkAuth(url);
  }

  private checkAuth(url: string) {
    //
    this.authService.redirectUrl = url;

    return this.checkStoreAuthentication().pipe(
      take(1),
      map((storeOrApiAuth) => {
        if (!storeOrApiAuth) {
          this.store.dispatch(
            AuthGuardServiceActions.navigateToSignIn({
              requestedUrl: url,
            })
          );
          return false;
        } else {
          return true;
        }
      })
    );
  }

  private checkStoreAuthentication() {
    //
    return this.store.pipe(
      select(selectHasChecked),
      filter((hasChecked) => hasChecked),
      exhaustMap(() => this.store.pipe(select(selectHasUser), take(1)))
    );
  }

  /*
  checkApiAuthentication() {
    return this.authService.check().pipe(
      map((user) => !!user),
      catchError(() => of(false)),
    );
  }
  */
}
