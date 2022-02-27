import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import {
  AuthActions,
  AuthApiActions,
  AuthGuardServiceActions,
  SignInPageActions,
  SignUpPageActions,
} from '@app/auth/actions';
import { AuthService } from '@app/auth/services/auth.service';

import { AuthEffects } from './auth.effects';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AppUser } from '../models/app-user.model';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let authService: AuthService;
  let actions$: Observable<any>;
  let routerService: any;
  let dialog: any;
  let angularFireAuth: AngularFireAuth;
  let store: MockStore;

  const AngularFireAuthStub = {
    //  user: of(null),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockStore(),
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        {
          provide: AuthService,
          useValue: { createAppUser$: jest.fn() },
        },
        provideMockActions(() => actions$),

        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
        {
          provide: MatDialog,
          useValue: {
            open: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
    actions$ = TestBed.inject(Actions);
    routerService = TestBed.inject(Router);
    angularFireAuth = TestBed.inject(AngularFireAuth);
    dialog = TestBed.inject(MatDialog);
    store = TestBed.inject(MockStore);

    jest.spyOn(routerService, 'navigate');
  });

  describe('appUser$', () => {
    /*
      1. Start signed out.
    */
    it('should return a signInNoUser(isAutoSignIn: true) if first value is null', () => {
      const action = AuthApiActions.autoSignInCheck();
      const completion = AuthApiActions.signInNoUser({ isAutoSignIn: true });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: null });
      const expected = cold('--b', { b: completion });

      jest.spyOn(authService, 'createAppUser$').mockReturnValue(response);
      expect(effects.appUser$).toBeObservable(expected);
    });

    /*
      1. Start signed in.
    */
    it('should return a signInHaveUser(isAutoSignIn: true) if first value is not null', () => {
      const user: AppUser = {
        uid: 'UID',
        email: 'EMAIL',
        taskListId: 'TASK_LIST_ID',
      };
      const action = AuthApiActions.autoSignInCheck();
      const completion = AuthApiActions.signInHaveUser({
        appUser: user,
        isAutoSignIn: true,
      });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: user });
      const expected = cold('--b', { b: completion });

      jest.spyOn(authService, 'createAppUser$').mockReturnValue(response);
      expect(effects.appUser$).toBeObservable(expected);
    });

    /*
      1. Start signed in.
      2. Sign out
    */
    it('should return a signInNoUser(isAutoSignIn: false) if second value is null', () => {
      const user: AppUser = {
        uid: 'UID',
        email: 'EMAIL',
        taskListId: 'TASK_LIST_ID',
      };
      const action = AuthApiActions.autoSignInCheck();
      const completion1 = AuthApiActions.signInHaveUser({
        appUser: user,
        isAutoSignIn: true,
      });
      const completion2 = AuthApiActions.signInNoUser({ isAutoSignIn: false });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a-b|', { a: user, b: null });
      const expected = cold('--a-b', { a: completion1, b: completion2 });

      jest.spyOn(authService, 'createAppUser$').mockReturnValue(response);
      expect(effects.appUser$).toBeObservable(expected);
    });

    /*
      1. Start signed out.
      2. Sign in.
    */
    it('should return a signInHaveUser(isAutoSignIn: false) if second value is not null', () => {
      const user: AppUser = {
        uid: 'UID',
        email: 'EMAIL',
        taskListId: 'TASK_LIST_ID',
      };
      const action = AuthApiActions.autoSignInCheck();

      const completion1 = AuthApiActions.signInNoUser({ isAutoSignIn: true });
      const completion2 = AuthApiActions.signInHaveUser({
        appUser: user,
        isAutoSignIn: false,
      });
      actions$ = hot('-a---', { a: action });
      const response = cold('-a-b|', { a: null, b: user });
      const expected = cold('--a-b', { a: completion1, b: completion2 });

      jest.spyOn(authService, 'createAppUser$').mockReturnValue(response);
      expect(effects.appUser$).toBeObservable(expected);
    });
  });
});
