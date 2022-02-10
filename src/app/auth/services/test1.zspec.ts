/*
import { Injectable } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import {
  ConvertService,
  FirestoreDoc,
  UserInfoDataService,
} from '@app/auth/services/user-info.data.service';

import { newUserInfo, UserInfo } from '@app/auth/models/user-info.model';
import { EnvironmentService } from '@app/core/environment.service';
import { constants } from 'zlib';



describe('mocks', () => {
  test('returns undefined by default', () => {
    const mock = jest.fn();

    const result = mock('foo');

    expect(result).toBeUndefined();
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('foo');
  });

  test("mock implementation", () => {
    const mock = jest.fn(() => "bar");

    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });

  test("also mock implementation", () => {
    const mock = jest.fn().mockImplementation(() => "bar");

    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });

  test("mock implementation one time", () => {
    const mock = jest.fn().mockImplementationOnce(() => "bar");

    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");

    expect(mock("baz")).toBe(undefined);
    expect(mock).toHaveBeenCalledWith("baz");
  });

  test("mock return value", () => {
    const mock = jest.fn();
    mock.mockReturnValue("bar");

    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });

  test("mock promise resolution", () => {
    const mock = jest.fn();
    mock.mockResolvedValue("bar");

    expect(mock("foo")).resolves.toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
  });
});

describe('Test1: UserInfoDataService - TestBed', () => {

    let environmentServiceStub: Partial<EnvironmentService>;

    environmentServiceStub = {
        appCode: 'APP-CODE'
    };

    const AngularFirestoreStub = {
      // I just mocked the function you need, if there are more, you can add them here.
      // collection: (someString) => {
      // return mocked collection here
      // },
    };

    // jest.mock('angularfire2/firestore');
    // let service: UserInfoDataService;
    //
    // const afs = {};
    // const convertService = {};
    // const environmentService = new EnvironmentService();
    let environmentService: EnvironmentService;
    let userInfoDataService: UserInfoDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        // Provide both the service-to-test and its dependencies.
        providers: [
          UserInfoDataService,
          { provide: EnvironmentService, useValue: environmentServiceStub },
          { provide: AngularFirestore, useValue: AngularFirestoreStub },
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
      // const spy = jest
      //   .spyOn(environmentService, 'appCode')
      //   .mockReturnValue('APP-CODE');

      // environmentService.appCode = 'bbbbb';
      expect(userInfoDataService.usersCollectionPath).toEqual(
        'apps/APP-CODE/users'
      );
      // expect(spy).toHaveBeenCalled();
      // expect(spy).toHaveBeenCalledTimes(1);
    });

  });


  describe('Test2', () => {

    // let myClass;
    @Injectable()
    class FakeEnvironmentService extends EnvironmentService {
        get appCode() {
            return 'aa';
        }
    }

    // let environmentServiceStub: Partial<EnvironmentService>;

    // environmentServiceStub = {
    //    appCode: 'APP-CODE'
    // };

    const AngularFirestoreStub = {
      // I just mocked the function you need, if there are more, you can add them here.
      // collection: (someString) => {
      // return mocked collection here
      // },
    };

    // jest.mock('angularfire2/firestore');
    // let service: UserInfoDataService;
    //
    // const afs = {};
    // const convertService = {};
    // const environmentService = new EnvironmentService();
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

      userInfoDataService = TestBed.get(UserInfoDataService);
      environmentService = TestBed.get(EnvironmentService);
    });

    it('ssss', () => {
        const fakeEnvironmentService = new FakeEnvironmentService();
        const spy = jest.spyOn(fakeEnvironmentService, 'appCode', 'get');
        expect(fakeEnvironmentService.appCode).toEqual('aa');
    });

    it('usersCollectionPath should be apps/APP-CODE/users', () => {
      const spy = jest
         .spyOn(environmentService, 'appCode', 'get')
         .mockReturnValue('APP-CODE');

      // environmentService.appCode = 'bbbbb';
      expect(userInfoDataService.usersCollectionPath).toEqual(
        'apps/APP-CODE/users'
      );
      // expect(spy).toHaveBeenCalled();
      // expect(spy).toHaveBeenCalledTimes(1);
    });

  });
  */
