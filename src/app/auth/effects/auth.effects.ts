import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { from, of } from 'rxjs';
import {
  concatMap,
  exhaustMap,
  filter,
  first,
  map,
  skip,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { pathPrefix, routeNames } from '@app/app-route-names';
import {
  AuthActions,
  AuthApiActions,
  AuthGuardServiceActions,
  SignInPageActions,
  SignUpPageActions,
} from '@app/auth/actions';
import { selectQueryParam } from '@app/root-store/reducers';

import { SignoutConfirmationDialogComponent } from '../components/signout-confirmation-dialog/signout-confirmation-dialog.component';
import { AuthRootState } from '../reducers';
import { selectIsAutoSignIn, selectUserId } from '../selectors/auth.selectors';
import { AuthService } from '../services/auth.service';

import { isPresent } from 'ts-is-present';

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
export class AuthEffects implements OnInitEffects {
  // With enablePersistence the first result will be from
  // the autoSignIn.
  //#region Sign In
  bbbautoSignInNoUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.autoSignInCheck),
      switchMap(() =>
        this.authService.appUser$.pipe(
          first(),
          filter((appUser) => appUser === null),
          map((appUser) => {
            return AuthApiActions.signInNoUser({ isAutoSignIn: true });
          })
        )
      )
    );
  });

  bbbautoSignInHaveUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.autoSignInCheck),
      switchMap(() =>
        this.authService.appUser$.pipe(
          first(),
          // Typescript type guard does not work here, so use isPresent.
          // https://github.com/microsoft/TypeScript/issues/16069#issuecomment-565658443
          filter(isPresent),
          map((appUser) => {
            return AuthApiActions.signInHaveUser({
              appUser,
              isAutoSignIn: true,
            });
          })
        )
      )
    );
  });

  bbbsignInNoUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.autoSignInCheck),
      switchMap(() =>
        this.authService.appUser$.pipe(
          skip(1),
          filter((appUser) => appUser === null),
          map((appUser) => {
            return AuthApiActions.signInNoUser({ isAutoSignIn: false });
          })
        )
      )
    );
  });

  bbbsignInHaveUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.autoSignInCheck),
      switchMap(() =>
        this.authService.appUser$.pipe(
          skip(1),
          // Typescript type guard does not work here, so use isPresent.
          // https://github.com/microsoft/TypeScript/issues/16069#issuecomment-565658443
          filter(isPresent),
          map((appUser) => {
            return AuthApiActions.signInHaveUser({
              appUser,
              isAutoSignIn: false,
            });
          })
        )
      )
    );
  });
  //#endregion

  // Watch userId and perform operations on change.
  aaAAAAA$ = createEffect(
    () => {
      return this.actions$.pipe(
        // tap((action) => console.log('aaAAAAA$:action',action)),
        ofType(AuthApiActions.autoSignInCheck),
        tap((action) => console.log('aaAAAAA$:actionA', action)),
        switchMap(() =>
          this.store.select(selectUserId).pipe(
            tap((userId) => console.log('aaAAAAA:userId>', userId)),
            filter((userId) => userId !== null),
            tap((userId) => console.log('aaAAAAA:Signed in userId>', userId))
          )
        )
      );
    },
    { dispatch: false }
  );

  /*
  manualSignIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        AuthApiActions.autoSignInHaveFirebaseUser,
        AuthApiActions.autoSignInNoFirebaseUser
      ),
      // tap(() => console.log('### manualSignIn$')),
      switchMap(() =>
        this.afAuth.authState.pipe(
          skip(1),
          map((firebaseUser) => {
            if (firebaseUser === null) {
              return AuthApiActions.manualSignInNoFirebaseUser();
            } else {
              return AuthApiActions.manualSignInHaveFirebaseUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
              });
            }
          })
        )
      )
    );
  });
*/

  signIn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SignInPageActions.signIn),
        tap((action) => {
          // const password = 'aaaaa';
          const password = action.credentials.password;
          this.afAuth
            .signInWithEmailAndPassword(action.credentials.username, password)
            .catch((error) =>
              this.store.dispatch(
                AuthApiActions.signInFailure({
                  error: {
                    code: error.code,
                    message: error.message,
                  },
                })
              )
            );
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SignUpPageActions.signUp),
        tap((action) => {
          const password = action.credentials.password;

          this.afAuth
            .createUserWithEmailAndPassword(
              action.credentials.username,
              password
            )
            .catch((error) =>
              this.store.dispatch(
                AuthApiActions.signUpFailure({
                  error: {
                    code: error.code,
                    message: error.message,
                  },
                })
              )
            );
        })
      );
    },
    { dispatch: false }
  );

  navigateToSignIn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthGuardServiceActions.navigateToSignIn),
        tap((action) => {
          this.router.navigate(['/sign-in'], {
            queryParams: { return: action.requestedUrl },
          });
        })
      );
    },
    { dispatch: false }
  );

  signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signOut),
        tap(() =>
          this.afAuth.signOut().then(() => {
            this.router.navigate(['/sign-in']);
            this.store.dispatch(AuthActions.signOutComplete());
          })
        )
      );
    },
    { dispatch: false }
  );

  signOutConfirmation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          SignoutConfirmationDialogComponent,
          undefined,
          boolean
        >(SignoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map((result) =>
        result
          ? AuthActions.signOut()
          : AuthActions.signOutConfirmationDismiss()
      )
    );
  });

  haveAppUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActions.signInHaveUser),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(selectQueryParam('return')),
              this.store.select(selectIsAutoSignIn)
            ),
            tap(([_, returnUrl, isAutoSignIn]) => {
              console.log(
                'AAAAA:returnUrl,isAutoSignIn>',
                returnUrl,
                isAutoSignIn
              );
              if (returnUrl) {
                this.router.navigateByUrl(returnUrl);
              } else {
                if (!isAutoSignIn) {
                  // Manual sign in with no return url.
                  this.router.navigateByUrl('/');
                }
              }
            })
          )
        )
      );
    },
    { dispatch: false }
  );

  doSignUp$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SignInPageActions.showSignUpPage),
        tap(() => {
          this.router.navigate([pathPrefix + routeNames.signUp.path]);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AuthRootState>
  ) {}

  ngrxOnInitEffects(): Action {
    return AuthApiActions.autoSignInCheck();
  }
}
