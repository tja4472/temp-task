import { TestBed } from '@angular/core/testing';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { merge, Observable, of, partition, switchMap } from 'rxjs';

import { AuthService } from './auth.service';
import { UserInfoDataService } from '@app/services/user-info.data.service';

import { UserInfo } from '@app/models/user-info.model';

import firebase from 'firebase/compat/app';

describe('AuthService', () => {
  const AngularFireAuthStub = {
    user: of(null),
  };

  const UserInfoDataServiceStub = {
    getOrCreateUserInfo(userId: string): Promise<UserInfo> {
      return new Promise<UserInfo>((resolve) => {
        resolve({ todoListId: 'TODO_LIST_ID_DUMMY' });
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
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: UserInfoDataService, useValue: UserInfoDataServiceStub },
      ],
    });

    authService = TestBed.inject(AuthService);
    angularFireAuth = TestBed.inject(AngularFireAuth);
    userInfoDataService = TestBed.inject(UserInfoDataService);
  });

  it('should be created', () => {
    expect(angularFireAuth).toBeTruthy();
    expect(authService).toBeTruthy();
    expect(userInfoDataService).toBeTruthy();
  });

  describe('createAppUser$', () => {
    // Test method not property.
    // const a$ = authService.appUser$;
    it('should be null if firebase user null', (done) => {
      jest.spyOn(authService, 'firebaseUser$').mockReturnValue(of(null));

      (async () => {
        const a$ = authService.createAppUser$();

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

    it('should have value if firebase user not null', (done) => {
      const a: Partial<firebase.User> = { uid: 'UIDa', email: 'EMAILa' };

      jest.spyOn(authService, 'firebaseUser$').mockReturnValue(of(a as any));
      jest
        .spyOn(userInfoDataService, 'getOrCreateUserInfo')
        .mockResolvedValue({ todoListId: 'TODO_LIST_IDa' });

      (async () => {
        const a$ = authService.createAppUser$();

        a$.subscribe((s) => {
          try {
            expect(s).toEqual({
              email: 'EMAILa',
              taskListId: 'TODO_LIST_IDa',
              uid: 'UIDa',
            });
            done();
          } catch (error) {
            done(error);
          }
        });
      })();
    });
  });
});
