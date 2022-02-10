import { Injectable } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { EnvironmentService } from '@app/core/environment.service';
import { newUserInfo, UserInfo } from '@app/models/user-info.model';
import {
  FirestoreDoc,
  fromFirestoreDoc,
  toFirestoreDoc,
  UserInfoDataService,
} from '@app/services/user-info.data.service';

describe('Conversion functions', () => {
  /*
  it('#fromFirestoreDoc should return null', () => {
    expect(fromFirestoreDoc(null)).toEqual(null);
  });
*/
  it('#fromFirestoreDoc should return UserInfo', () => {
    const expectedUserInfo: UserInfo = { todoListId: 'TODO_LIST_ID' };
    const firestoreDoc: FirestoreDoc = { todoListId: 'TODO_LIST_ID' };

    expect(fromFirestoreDoc(firestoreDoc)).toEqual(expectedUserInfo);
  });

  it('#toFirestoreDoc should return FirestoreDoc', () => {
    const userInfo: UserInfo = { todoListId: 'TODO_LIST_ID' };
    const expectedFirestoreDoc: FirestoreDoc = { todoListId: 'TODO_LIST_ID' };

    expect(toFirestoreDoc(userInfo)).toEqual(expectedFirestoreDoc);
  });
});

describe('Service: UserInfoDataService - no TestBed', () => {
  let service: UserInfoDataService;
  //
  const afs = {};
  const environmentService = new EnvironmentService();

  beforeEach(() => {
    service = new UserInfoDataService(afs as any, environmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  it('usersCollectionPath should be apps/APP-CODE/users', () => {
    const spy = jest
      .spyOn(environmentService, 'appCode', 'get')
      .mockReturnValue('APP-CODE');

    expect(service.usersCollectionPath).toEqual('apps/APP-CODE/users');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
*/
});

describe('Service: UserInfoDataService - TestBed', () => {
  const AngularFirestoreStub = {
    // I just mocked the function you need, if there are more, you can add them here.
    // collection: (someString) => {
    // return mocked collection here
    // },
  };

  @Injectable()
  class FakeEnvironmentService extends EnvironmentService {
    get appCode() {
      return 'aa';
    }
  }

  let environmentService: EnvironmentService;
  let userInfoDataService: UserInfoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Provide both the service-to-test and its dependencies.
      providers: [
        UserInfoDataService,
        { provide: EnvironmentService, useClass: FakeEnvironmentService },
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
      ],
    });

    userInfoDataService = TestBed.inject(UserInfoDataService);
    environmentService = TestBed.inject(EnvironmentService);
  });

  it('should be created', inject(
    [UserInfoDataService],
    (service: UserInfoDataService) => {
      expect(service).toBeTruthy();
    }
  ));
  /*
  it('usersCollectionPath should be apps/APP-CODE/users', () => {
    const spy = jest
      .spyOn(environmentService, 'appCode', 'get')
      .mockReturnValue('APP-CODE');

    expect(userInfoDataService.usersCollectionPath).toEqual(
      'apps/APP-CODE/users'
    );
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
*/
});

describe('UserInfoDataService - AngularFirestoreStub', () => {
  const AngularFirestoreStub = {
    // I just mocked the function you need, if there are more, you can add them here.
    // collection: (someString) => {
    // return mocked collection here
    // },
  };

  // const spyAA = jest.fn();

  let environmentService: EnvironmentService;
  let userInfoDataService: UserInfoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Provide both the service-to-test and its dependencies.
      providers: [
        // UserInfoDataServiceA,
        EnvironmentService,
        // { provide: AngularFirestore, useValue: AngularFirestoreStub },
        // { provide: AngularFirestore, useValue: spyAA },
      ],
    });

    userInfoDataService = TestBed.inject(UserInfoDataService);
    environmentService = TestBed.inject(EnvironmentService);
  });
  /*
  it('should be created', inject(
    [UserInfoDataService],
    (service: UserInfoDataService) => {
      expect(service).toBeTruthy();
    }
  ));
*/
  /*
  it('usersCollectionPath should be apps/APP-CODE/users', () => {
    // const spy = spyOnProperty(environmentService, 'appCode').and.returnValue(
    //  'APP-CODE'
    // );
    const spy = jest
      .spyOn(environmentService, 'appCode', 'get')
      .mockReturnValue('APP-CODE');

    expect(userInfoDataService.usersCollectionPath).toEqual(
      'apps/APP-CODE/users'
    );
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
*/
});

/*
describe('UserInfoDataService - Testing without beforeEach()', () => {
  function setup() {
    const stubValue = 'stub value';
    // jasmine.createSpyObj
    // const appCode = jest.fn().mockReturnValue(stubValue);
    // const makeEnvironmentService = EnvironmentService.
    // const s = jest.fn({key: jest.fn()});

    const environmentServiceSpy = {
      appCode: jest.fn(),
      settings: {appCode: jest.fn()}
    };

    environmentServiceSpy.appCode.mockReturnValue(stubValue);
    environmentServiceSpy.settings.appCode.mockReturnValue('SSSSSSSs');

    const convertServiceSpy = jest.fn<ConvertService>();
    const angularFirestoreSpy = jest.fn();
    const userInfoDataService = new UserInfoDataService(
      angularFirestoreSpy as any,
      convertServiceSpy as any,
      environmentServiceSpy as any
    );
    // const stubValue = 'stub value';



    return { userInfoDataService, stubValue, environmentServiceSpy};
  }

  it ('aaaaaaaaaaaaaaaa', () => {
    const { userInfoDataService, stubValue, environmentServiceSpy} = setup();
    expect(userInfoDataService.usersCollectionPath).toEqual(
      'apps/APP-CODE/users'
    );
  });
});
*/

/*
describe('UserInfoDataService - angularFirestoreSpy', () => {
  let environmentService: EnvironmentService;
  let userInfoDataService: UserInfoDataService;

  beforeEach(() => {
    const angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', [
      'dummy',
    ]);

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its dependencies.
      providers: [
        // UserInfoDataServiceA,
        EnvironmentService,
        { provide: AngularFirestore, useValue: angularFirestoreSpy },
      ],
    });

    userInfoDataService = TestBed.get(UserInfoDataService);
    environmentService = TestBed.get(EnvironmentService);
  });

  it('should be created', inject(
    [UserInfoDataService],
    (service: UserInfoDataService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('usersCollectionPath should be apps/APP-CODE/users', () => {
    const spy = spyOnProperty(environmentService, 'appCode').and.returnValue(
      'APP-CODE'
    );
    expect(userInfoDataService.usersCollectionPath).toEqual(
      'apps/APP-CODE/users'
    );
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
*/
