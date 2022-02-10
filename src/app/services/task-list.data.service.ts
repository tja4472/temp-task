import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskListListItem } from '../root-store/tasks-store/models';

const DATA_COLLECTION = 'todo-lists';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskListDataService {
  constructor(public readonly afs: AngularFirestore) {}

  public getData(userId: string): Observable<TaskListListItem[]> {
    //
    return this.firestoreCollection(userId)
      .valueChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          })
        )
      );
  }

  public removeItem(id: string, userId: string): void {
    this.firestoreCollection(userId).doc(id).delete();
  }

  public save(item: TaskListListItem, userId: string): void {
    const doc = this.toFirestoreDoc(item);

    if (item.id === '') {
      doc.id = this.afs.createId();
    }

    this.firestoreCollection(userId).doc(doc.id).set(doc);
  }

  private firestoreCollection(userId: string) {
    //
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection<FirestoreDoc>(DATA_COLLECTION, (ref) =>
        ref.orderBy('name', 'asc')
      );
  }

  private toFirestoreDoc(item: TaskListListItem): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      id: item.id,
      name: item.name,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): TaskListListItem {
    //
    const result: TaskListListItem = {
      id: x.id,
      name: x.name,
    };

    return result;
  }
}
