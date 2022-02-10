import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { TaskListsPageActions } from '@app/root-store/tasks-store/actions';
import { TaskListListItem } from '@app/root-store/tasks-store/models';
import { TaskListSelectors } from '@app/root-store/tasks-store/selectors';

@Component({
  selector: 'app-task-lists-page',
  templateUrl: './task-lists-page.component.html',
  styleUrls: ['./task-lists-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListsPageComponent implements OnInit {
  taskLists$: Observable<TaskListListItem[]>;

  constructor(private store: Store<{}>) {
    this.taskLists$ = store.pipe(select(TaskListSelectors.selectAll));
  }

  ngOnInit() {
    this.store.dispatch(TaskListsPageActions.enter());
  }

  viewNewCurrentTask() {
    this.store.dispatch(TaskListsPageActions.newTaskList());
  }
}
