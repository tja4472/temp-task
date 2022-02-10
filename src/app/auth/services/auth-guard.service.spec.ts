import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AuthGuardServiceActions } from '../actions';
import { AuthRootState } from '../reducers';
import { AuthSelectors } from '../selectors';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

import { getTestScheduler } from 'jasmine-marbles';

// Marble syntax
// https://rxjs-dev.firebaseapp.com/guide/testing/internal-marble-tests#marble-syntax

describe(AuthGuardService.name, () => {
  let authGuardService: AuthGuardService;
  // Store
  let mockStore: MockStore;
  // Selectors
  let authSelectorsSelectHasChecked: MemoizedSelector<AuthRootState, boolean>;
  let authSelectorsSelectHasUser: MemoizedSelector<AuthRootState, boolean>;
  // Spies
  let mockStoreDispatchSpy: jasmine.Spy;
  let spyObjRouterStateSnapshot: jasmine.SpyObj<RouterStateSnapshot>;
  let spyObjActivatedRouteSnapshot: jasmine.SpyObj<ActivatedRouteSnapshot>;

  const dummyUrl = 'dummy/url';

  beforeEach(() => {
    const spyObjAuthService = jasmine.createSpyObj<AuthService>('AuthService', [
      'redirectUrl',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuardService,
        provideMockStore(),
        { provide: AuthService, useValue: spyObjAuthService },
      ],
    });

    mockStore = TestBed.inject(MockStore);
    mockStoreDispatchSpy = spyOn(mockStore, 'dispatch');

    authGuardService = TestBed.inject(AuthGuardService);

    // create a jasmine spy object, of the required type
    // toString is because we have to mock at least one method
    spyObjRouterStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
      'RouterStateSnapshot',
      ['toString']
    );
    spyObjActivatedRouteSnapshot = jasmine.createSpyObj<ActivatedRouteSnapshot>(
      'ActivatedRouteSnapshot',
      ['toString']
    );

    authSelectorsSelectHasChecked = mockStore.overrideSelector(
      AuthSelectors.selectHasChecked,
      false
    );
    authSelectorsSelectHasUser = mockStore.overrideSelector(
      AuthSelectors.selectHasUser,
      false
    );
  });

  describe('canActivate', () => {
    it('should return NEVER if auth has not been checked', () => {
      spyObjRouterStateSnapshot.url = dummyUrl;

      const scheduler = getTestScheduler();
      scheduler.run(({ expectObservable }) => {
        expectObservable(
          authGuardService.canActivate(
            spyObjActivatedRouteSnapshot,
            spyObjRouterStateSnapshot
          )
        ).toBe('--', {
          a: false,
        });
      });

      expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(0);

      // suppress 'has no expectations' warnings.
      expect().nothing();
    });

    it('should return Observable<false> if auth has been checked and not signed in', () => {
      authSelectorsSelectHasChecked.setResult(true);

      spyObjRouterStateSnapshot.url = dummyUrl;

      const scheduler = getTestScheduler();
      scheduler.run(({ expectObservable }) => {
        expectObservable(
          authGuardService.canActivate(
            spyObjActivatedRouteSnapshot,
            spyObjRouterStateSnapshot
          )
        ).toBe('(a|)', {
          a: false,
        });
      });

      const action = AuthGuardServiceActions.navigateToSignIn({
        requestedUrl: dummyUrl,
      });
      expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(1);
      expect(mockStoreDispatchSpy).toHaveBeenCalledWith(action);

      // suppress 'has no expectations' warnings.
      expect().nothing();
    });

    it('should return Observable<true> if auth has been checked and is signed in', () => {
      authSelectorsSelectHasChecked.setResult(true);
      authSelectorsSelectHasUser.setResult(true);

      spyObjRouterStateSnapshot.url = dummyUrl;

      const scheduler = getTestScheduler();
      scheduler.run(({ expectObservable }) => {
        expectObservable(
          authGuardService.canActivate(
            spyObjActivatedRouteSnapshot,
            spyObjRouterStateSnapshot
          )
        ).toBe('(a|)', {
          a: true,
        });
      });

      expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(0);

      // suppress 'has no expectations' warnings.
      expect().nothing();
    });
  });

  describe('canLoad', () => {
    it('should return NEVER if auth has not been checked', () => {
      spyObjRouterStateSnapshot.url = dummyUrl;

      const scheduler = getTestScheduler();
      scheduler.run(({ expectObservable }) => {
        expectObservable(
          authGuardService.canActivate(
            spyObjActivatedRouteSnapshot,
            spyObjRouterStateSnapshot
          )
        ).toBe('--', {
          a: false,
        });
      });

      expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(0);

      // suppress 'has no expectations' warnings.
      expect().nothing();
    });

    it('should return Observable<false> if auth has been checked and not signed in', () => {
      authSelectorsSelectHasChecked.setResult(true);

      spyObjRouterStateSnapshot.url = dummyUrl;

      const scheduler = getTestScheduler();
      scheduler.run(({ expectObservable }) => {
        expectObservable(
          authGuardService.canActivate(
            spyObjActivatedRouteSnapshot,
            spyObjRouterStateSnapshot
          )
        ).toBe('(a|)', {
          a: false,
        });
      });

      const action = AuthGuardServiceActions.navigateToSignIn({
        requestedUrl: dummyUrl,
      });
      expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(1);
      expect(mockStoreDispatchSpy).toHaveBeenCalledWith(action);

      // suppress 'has no expectations' warnings.
      expect().nothing();
    });

    it('should return Observable<true> if auth has been checked and is signed in', () => {
      authSelectorsSelectHasChecked.setResult(true);
      authSelectorsSelectHasUser.setResult(true);

      spyObjRouterStateSnapshot.url = dummyUrl;

      const scheduler = getTestScheduler();
      scheduler.run(({ expectObservable }) => {
        expectObservable(
          authGuardService.canActivate(
            spyObjActivatedRouteSnapshot,
            spyObjRouterStateSnapshot
          )
        ).toBe('(a|)', {
          a: true,
        });
      });

      expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(0);

      // suppress 'has no expectations' warnings.
      expect().nothing();
    });
  });
});
