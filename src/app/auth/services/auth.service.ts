import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { from, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { UserInfoDataService } from '@app/services/user-info.data.service';

import { AppUser } from '../models/app-user.model';

// https://benjaminjohnson.me/blog/typesafe-errors-in-typescript
type ResultSuccess<T> = { type: 'success'; value: T };

type ResultError = { type: 'error'; error: Error; errorCode: string };

type Result<T> = ResultSuccess<T> | ResultError;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl = '';

  appUser$: Observable<AppUser | null>;

  constructor(
    private readonly auth: AngularFireAuth,
    private userInfoDataService: UserInfoDataService
  ) {
    this.appUser$ = this.auth.user.pipe(
      switchMap((user) => {
        if (user === null) {
          return of(null);
        } else {
          return this.userInfoDataService.getItem$(user.uid).pipe(
            // Stop listening for changes.
            first(),
            map((userInfo) => {
              if (user.email === null) {
                throw new Error('user.email is null');
              }
              const result: AppUser = {
                taskListId: userInfo.todoListId,
                uid: user.uid,
                email: user.email,
              };
              return result;
            })
          );
        }
      })
    );
  }
  /*
      this.store.dispatch(
        AuthApiActions.signInFailure({
          error: {
            code: error.code,
            message: error.message,
          },
        })
      )
*/
  signIn() {
    this.auth
      .signInWithEmailAndPassword('email', 'password')
      .then((cred) => {
        console.log('Signed in>', cred);
      })
      .catch((error: unknown) => {
        // this doesn't work
        // if (error instanceof FirebaseError) {
        if (error instanceof Error) {
          console.error(error.message); // It's an Error instance.
          // console.error('error>>>>', error.code);
          return { success: true, errorCode: error.message };
        } else {
          console.error('🤷‍♂️'); // Who knows?
        }
      });
  }

  signInAAA() {
    this.auth
      .signInWithEmailAndPassword('email', 'password')
      .then((cred) => {
        console.log('Signed in>', cred);
      })
      .catch((error) => {});
  }

  // firebase.FirebaseError
  login(email: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  /*
  async aaaaa(
    email: string,
    password: string
  ): Promise<ResultSuccess<firebase.auth.UserCredential> | ResultError> {
    try {
      const result = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      return { type: 'success', value: result };
      /*
      const success: ResultSuccess<firebase.auth.UserCredential> = {
        type: 'success',
        value: result,
      };
      return success;
*
    } catch (error) {
      const errorCode: string = error.code;
      const errorMessage: string = error.message;

      return { type: 'error', error, errorCode };
      /*
      const resultError: ResultError = { type: 'error', error, errorCode };
      return resultError;
*
    }
  }

  bbbb(email: string, password: string) {
    return from(this.aaaaa(email, password));
  }
*/
}
