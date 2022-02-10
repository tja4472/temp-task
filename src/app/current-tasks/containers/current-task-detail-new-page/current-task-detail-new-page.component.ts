import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { CurrentTaskDetailNewPageActions } from '@app/root-store/tasks-store/actions';
import {
  CurrentTask,
  newCurrentTask,
} from '@app/root-store/tasks-store/models';

@Component({
  selector: 'app-current-task-detail-new-page',
  templateUrl: './current-task-detail-new-page.component.html',
  styleUrls: ['./current-task-detail-new-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTaskDetailNewPageComponent implements OnInit {
  task = newCurrentTask();

  constructor(private store: Store<{}>) {}

  ngOnInit() {}

  viewCancelled(todo: CurrentTask): void {
    this.store.dispatch(CurrentTaskDetailNewPageActions.cancelled());
  }

  viewSaved(todo: CurrentTask) {
    this.store.dispatch(
      CurrentTaskDetailNewPageActions.saved({ currentTask: todo })
    );
  }
}
