import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { TaskListDetailNewPageActions } from '@app/root-store/tasks-store/actions';
import {
  newTaskListListItem,
  TaskListListItem,
} from '@app/root-store/tasks-store/models';

@Component({
  selector: 'app-task-list-detail-new-page',
  templateUrl: './task-list-detail-new-page.component.html',
  styleUrls: ['./task-list-detail-new-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListDetailNewPageComponent implements OnInit {
  task$ = newTaskListListItem();

  constructor(private store: Store<{}>) {}

  ngOnInit() {}

  viewCancelled(todoCompleted: TaskListListItem): void {
    this.store.dispatch(TaskListDetailNewPageActions.cancelled());
  }

  viewSaved(todoCompleted: TaskListListItem) {
    this.store.dispatch(
      TaskListDetailNewPageActions.saved({ taskList: todoCompleted })
    );
  }
}
