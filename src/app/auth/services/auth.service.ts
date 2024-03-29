import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { from, merge, Observable, of, OperatorFunction, partition } from 'rxjs';
import { filter, first, map, share, switchMap, tap } from 'rxjs/operators';

import { UserInfoDataService } from '@app/services/user-info.data.service';

import { AppUser } from '../models/app-user.model';

import firebase from 'firebase/compat/app';

// https://benjaminjohnson.me/blog/typesafe-errors-in-typescript
type ResultSuccess<T> = { type: 'success'; value: T };

type ResultError = { type: 'error'; error: Error; errorCode: string };

type Result<T> = ResultSuccess<T> | ResultError;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl = '';

  zzzappUser$: Observable<AppUser | null> = this.createAppUser$();

  constructor(
    private readonly auth: AngularFireAuth,
    private userInfoDataService: UserInfoDataService
  ) {
    if (window.Cypress) {
      window.AuthService = this;
    }
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
  createAppUser$(): Observable<AppUser | null> {
    return this.firebaseUser$().pipe(
      switchMap((firebaseUser) => {
        if (firebaseUser === null) {
          return of(null);
        }

        return from(
          this.userInfoDataService.getOrCreateUserInfo(firebaseUser.uid)
        ).pipe(
          first(),
          map((userInfo) => {
            const result: AppUser = {
              taskListId: userInfo.todoListId,
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? '',
            };
            return result;
          })
        );
      })
    );
  }

  public firebaseUser$(): Observable<null | firebase.User> {
    // Added so can be mocked in tests.
    return this.auth.user;
  }

  public async addUserData(userId: string) {
    await this.userInfoDataService.addUserData(userId);
  }

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * Used by Cypress
   * @param email
   * @param password
   * @returns
   */
  public signInCypress(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Used by Cypress
   * @returns
   */
  public signOutCypress(): Promise<void> {
    return this.auth.signOut();
  }

  /**
   * Used by Cypress
   * @param email
   * @param password
   * @returns
   */
  public signUpCypress(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async signUp1(email: string, password: string) {
    const userCredential = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    /*    
    if (userCredential.user) {
      const userInfo = await this.userInfoDataService.addUserData(
        userCredential.user.uid
      );

      await this.taskListDataService.save(
        { id: userInfo.todoListId, name: 'Default' },
        userCredential.user.uid
      );
    }
*/
  }

  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public signOut(): Promise<void> {
    return this.auth.signOut();
  }

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
