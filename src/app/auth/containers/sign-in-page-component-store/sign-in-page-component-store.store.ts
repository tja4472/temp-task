import { Injectable } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';

import { EMPTY, from, Observable } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  pairwise,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { Credentials } from '@app/auth/models/credentials.model';
import { AuthService } from '@app/auth/services/auth.service';

export interface SignInPageComponentStoreState {
  error: string | null;
  pending: boolean;
}

@Injectable()
export class SignInPageComponentStore extends ComponentStore<
  SignInPageComponentStoreState
> {
  constructor(private readonly authService: AuthService) {
    // set defaults
    super({ error: null, pending: false });
  }

  // *********** Updaters *********** //
  // https://github.com/microsoft/TypeScript/issues/241
  // Explicitly type the arrow function to detect excess fields.
  readonly updater1 = this.updater(
    (state): SignInPageComponentStoreState => ({
      ...state,
      error: 'error text',
    })
  );

  readonly setErrorText = this.updater(
    (state, value: string): SignInPageComponentStoreState => ({
      ...state,
      error: value,
    })
  );

  // https://github.com/microsoft/TypeScript/issues/241
  // Explicitly type the arrow function to detect excess fields.
  readonly setPending = this.updater(
    (state, value: boolean): SignInPageComponentStoreState => ({
      ...state,
      pending: value,
    })
  );
  // *********** Selectors *********** //

  // ViewModel of component
  readonly vm$ = this.select((state) => state);

  // *********** Effects *********** //
  readonly effect1 = this.effect((text$: Observable<string>) => {
    return text$.pipe(
      // tap((x) => console.log('aaa>', x))
      tap({
        next: (x) => {
          console.log('aaa>', x);
          this.updater1();
          this.setPending(true);
          this.authService.signIn();
        },
      })
    );
  });

  readonly effect2 = this.effect((credentials$: Observable<Credentials>) => {
    return credentials$.pipe(
      tap({
        next: (x) => {
          this.setPending(true);
        },
      }),
      concatMap((credentials) =>
        this.authService.login(credentials.username, credentials.password).pipe(
          // 👇 Act on the result within inner pipe.
          map((res) => {
            if (res.user === null) {
              return;
            }

            const user = { uid: res.user.uid };
            console.log('Signin success>', user);
          }),
          catchError((error) => {
            console.error('Error>>>>', error);
            this.setErrorText(error.message);
            this.setPending(false);
            return EMPTY;
          })
        )
      )
    );
  });
  /*
  readonly effect3 = this.effect((credentials$: Observable<Credentials>) => {
    return credentials$.pipe(
      tap({
        next: (x) => {
          this.setPending(true);
        },
      }),
      concatMap((credentials) =>
        this.authService.bbbb(credentials.username, credentials.password).pipe(
          // 👇 Act on the result within inner pipe.
          map((res) => {
            if (res.type === 'success') {
              console.log('Signin success>', res.value);
            } else {
              console.error('Error>>>>', res.error);
              this.setErrorText(res.error.message);
              this.setPending(false);
            }

            // const user = { uid: res.user.uid };
            // console.log('Signin success>', user);
          }),
          catchError((error) => {
            console.error('catchError>>>>', error);
            // this.setErrorText(error.message);
            // this.setPending(false);
            return EMPTY;
          })
        )
      )
    );
  });

  readonly effect4 = this.effect((credentials$: Observable<Credentials>) => {
    return credentials$.pipe(
      tap({
        next: (x) => {
          this.setPending(true);
        },
      }),
      concatMap((credentials) =>
        from(
          this.authService.aaaaa(credentials.username, credentials.password)
        ).pipe(
          // 👇 Act on the result within inner pipe.
          tap((res) => {
            if (res.type === 'success') {
              console.log('Signin success>', res.value);
            } else {
              console.error('Error>>>>', res.error);
              console.error('ErrorCode>>>>', res.errorCode);
              this.setErrorText(res.error.message);
              this.setPending(false);
            }

            // const user = { uid: res.user.uid };
            // console.log('Signin success>', user);
          }),
          catchError((error) => {
            console.error('catchError>>>>', error);
            // this.setErrorText(error.message);
            // this.setPending(false);
            return EMPTY;
          })
        )
      )
    );
   
  });
  */
}
