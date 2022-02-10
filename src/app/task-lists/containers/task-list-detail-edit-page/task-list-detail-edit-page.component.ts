import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { RootState } from '@app/root-store/reducers';
import { TaskListDetailEditPageActions } from '@app/root-store/tasks-store/actions';
import { TaskListListItem } from '@app/root-store/tasks-store/models';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Component({
  selector: 'app-task-list-detail-edit-page',
  templateUrl: './task-list-detail-edit-page.component.html',
  styleUrls: ['./task-list-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListDetailEditPageComponent implements OnInit {
  task$: Observable<TaskListListItem | undefined>;

  constructor(private store: Store<RootState>) {
    this.task$ = store.pipe(select(TaskSelectors.selectTaskListFromRoute));
  }

  ngOnInit() {}

  viewCancelled(taskList: TaskListListItem): void {
    this.store.dispatch(TaskListDetailEditPageActions.cancelled({ taskList }));
  }

  viewRemoved(taskList: TaskListListItem): void {
    this.store.dispatch(TaskListDetailEditPageActions.removed({ taskList }));
  }

  viewSaved(taskList: TaskListListItem) {
    this.store.dispatch(TaskListDetailEditPageActions.saved({ taskList }));
  }
}
