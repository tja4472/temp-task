// tslint:disable:max-classes-per-file
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { EnvironmentService } from '@app/core/environment.service';
import { newUserInfo, UserInfo } from '@app/models/user-info.model';

/*
const APP_KEY = 'apps/' + environment.appCode;
const USERS_COLLECTION = APP_KEY + '/users';
*/
export interface FirestoreDoc {
  todoListId: string;
}

export const fromFirestoreDoc = (x: FirestoreDoc): UserInfo => {
  //
  const result: UserInfo = {
    todoListId: x.todoListId,
  };

  return result;
};

export const toFirestoreDoc = (item: UserInfo): FirestoreDoc => {
  //
  const result: FirestoreDoc = {
    todoListId: item.todoListId,
  };

  return result;
};

// Replace fromFirestoreDoc/toFirestoreDoc functions
// with public methods??
@Injectable({
  providedIn: 'root',
})
export class UserInfoDataService {
  public get usersCollectionPath(): string {
    // original
    // return 'apps/' + this.environmentService.appCode + '/users';
    // temp to conform to old example.
    return 'users';
  }

  constructor(
    public readonly afs: AngularFirestore,
    public readonly environmentService: EnvironmentService
  ) {
    console.log('UserInfoDataService:constructor');
    /*
    console.log(
      'environmentService.settings.appCode>',
      environmentService.settings.appCode
    );
    */
    console.log('environmentService.appCode>', environmentService.appCode);
    // console.log('USERS_COLLECTION>', USERS_COLLECTION);

    // create user collection if missing
  }

  public async getUserData(userId: string): Promise<UserInfo> {
    const userData = await this.getItem$(userId).pipe(take(1)).toPromise();

    if (!!userData) {
      // Have userData.
      return userData;
    }

    // No userData.
    // This will happen after sign up.
    const defaultValue = newUserInfo();
    await this.save(defaultValue, userId);
    return defaultValue;
  }

  public async addUserData(userId: string): Promise<UserInfo> {
    const defaultValue = newUserInfo();
    await this.save(defaultValue, userId);
    return defaultValue;
  }
  
  /*
  public getSingleItem$(userId: string) {
    const doc = this.getItem$(userId)
      .pipe(take(1))
      .toPromise()
      .then((value) => {
        if (!!value) {
          console.log('>> Have document');
          return value;
        } else {
          console.log('>> No document');
          // Document doesn't exist.
          // This will happen after sign up.
          const defaultValue = newUserData();
          this.save(defaultValue, userId);
          return defaultValue;
        }
      });

    return from(doc);
  }
  */

  // Need to throw error if doc is undefined.
  public getItem$(userId: string): Observable<UserInfo> {
    //
    return this.firestoreDocument(userId)
      .valueChanges()
      .pipe(
        map((item) => {
          if (item === undefined) {
            throw new Error('UserInfo undefined');
          }
          return fromFirestoreDoc(item);
        })
      );
  }

  public save(item: UserInfo, userId: string): Promise<void> {
    const doc = toFirestoreDoc(item);
    console.log('>> Save>', doc);
    /*
    this.firestoreDocument(userId).valueChanges().pipe(take(1)).subscribe((x) => {
        console.log('KKKK>', x);
    });
    */
    return this.firestoreDocument(userId).set(doc);
  }

  private firestoreDocument(userId: string) {
    //
    return this.afs
      .collection(this.usersCollectionPath)
      .doc<FirestoreDoc>(userId);
    // return this.afs.doc<FirestoreDoc>(this.usersCollectionPath + '/' + userId);
  }

  /*
  private toFirestoreDoc(item: UserInfo): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      todoListId: item.todoListId,
    };

    return result;
  }
  */
  /*
  private fromFirestoreDoc(x: FirestoreDoc | null): UserInfo | null {
    //
    console.log('ZZZZZZZZZZZZZZZZZ>', x);

    if (x == null) {
      return null;
    }

    const result: UserInfo = {
      todoListId: x.todoListId,
    };

    return result;
  }
  */
}
