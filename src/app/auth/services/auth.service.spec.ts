import { TestBed } from '@angular/core/testing';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { merge, Observable, of, partition, switchMap } from 'rxjs';

import { AuthService } from './auth.service';
import { UserInfoDataService } from '@app/services/user-info.data.service';

import { UserInfo } from '@app/models/user-info.model';

import firebase from 'firebase/compat/app';

describe('AuthService', () => {
  describe('null user', () => {
    const AngularFireAuthStub = {
      user: of(null),
    };

    const UserInfoDataServiceStub = {};

    let angularFireAuth: AngularFireAuth;
    let authService: AuthService;
    let userInfoDataService: UserInfoDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        // Provide both the service-to-test and its dependencies.
        providers: [
          AuthService,
          { provide: UserInfoDataService, useValue: UserInfoDataServiceStub },
          { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        ],
      });

      angularFireAuth = TestBed.inject(AngularFireAuth);
      userInfoDataService = TestBed.inject(UserInfoDataService);

      authService = TestBed.inject(AuthService);
    });

    it('should be created', () => {
      expect(angularFireAuth).toBeTruthy();
      expect(authService).toBeTruthy();
      expect(userInfoDataService).toBeTruthy();
    });

    it('appUser$ should be null', (done) => {
      (async () => {
        const a$ = authService.appUser$;

        a$.subscribe((s) => {
          try {
            expect(s).toBeNull();
            done();
          } catch (error) {
            done(error);
          }
        });
      })();
    });
  });

  describe('non null user', () => {


    const AngularFireAuthStub = {
      user: of({ uid: 'UID', email: 'EMAIL' }),
    };

    const UserInfoDataServiceStub = {
      getOrCreateUserInfo(userId: string): Promise<UserInfo> {
        return new Promise<UserInfo>((resolve) => {
          resolve({ todoListId: 'TODO_LIST_ID' });
        });
      },
    };

    let angularFireAuth: AngularFireAuth;
    let authService: AuthService;
    let userInfoDataService: UserInfoDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        // Provide both the service-to-test and its dependencies.
        providers: [
          AuthService,
          { provide: UserInfoDataService, useValue: UserInfoDataServiceStub },
          { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        ],
      });

      angularFireAuth = TestBed.inject(AngularFireAuth);
      userInfoDataService = TestBed.inject(UserInfoDataService);

      authService = TestBed.inject(AuthService);
    });

    it('should be created', () => {
      expect(angularFireAuth).toBeTruthy();
      expect(authService).toBeTruthy();
      expect(userInfoDataService).toBeTruthy();
    });

    it('appUser$ should have value', (done) => {
      (async () => {
        const a$ = authService.appUser$;

        a$.subscribe((s) => {
          try {
            expect(s).toEqual({
              email: 'EMAIL',
              taskListId: 'TODO_LIST_ID',
              uid: 'UID',
            });
            done();
          } catch (error) {
            done(error);
          }
        });
      })();
    });

    it('test testy', () => {
      expect(authService.testy()).toEqual('fred');
    });   
    
    it('test testy with spyOn', () => {
      jest.spyOn(authService, 'testy').mockImplementation(()=>'Hello');
      expect(authService.testy()).toEqual('Hello');
    });      
  });
});


describe('Test2', () => {
  it('xxxx', (done) => {
    (async () => {
      const source$ = of('aaa');

      const a$ = source$.pipe(
        switchMap((user) => {
          return of(null);
        })
      );

      a$.subscribe((s) => {
        try {
          expect(s).toBeNull();
          done();
        } catch (error) {
          done(error);
        }
      });
    })();
  });

  it('xxxx1', (done) => {
    (async () => {
      const source$ = of('aaa');

      const [null$, nonNull$] = partition(
        source$,
        (value, index) => value === null
      );

      null$.subscribe((s) => {
        try {
          expect(s).toBeNull();
          done();
        } catch (error) {
          done(error);
        }
      });

      nonNull$.subscribe((s) => {
        try {
          expect(s).toEqual('aaa');
          done();
        } catch (error) {
          done(error);
        }
      });

      merge(nonNull$, null$).subscribe((s) => {
        try {
          expect(s).toEqual('aaa');
          done();
        } catch (error) {
          done(error);
        }
      });
    })();
  });

  it('xxxx2', (done) => {
    (async () => {
      const source$ = of('aaa');

      const [null$, nonNull$] = partition(
        source$,
        (value, index) => value === null
      );

      merge(nonNull$, null$).subscribe((s) => {
        try {
          expect(s).toEqual('aaa');
          done();
        } catch (error) {
          done(error);
        }
      });
    })();
  });

  it('xxxx3', (done) => {
    (async () => {
      const source$ = of(null);

      const [null$, nonNull$] = partition(
        source$,
        (value, index) => value === null
      );

      merge(nonNull$, null$).subscribe((s) => {
        try {
          expect(s).toBeNull();
          done();
        } catch (error) {
          done(error);
        }
      });
    })();
  });
});
