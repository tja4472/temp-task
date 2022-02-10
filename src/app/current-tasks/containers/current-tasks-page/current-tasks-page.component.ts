import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  CurrentTasksPageActions,
  TodoActions,
} from '@app/root-store/tasks-store/actions';
import {
  CurrentTask,
  toggleIsComplete,
} from '@app/root-store/tasks-store/models';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Component({
  selector: 'app-current-tasks-page',
  templateUrl: './current-tasks-page.component.html',
  styleUrls: ['./current-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTasksPageComponent implements OnInit {
  currentTasks$: Observable<CurrentTask[]>;

  constructor(private store: Store<{}>) {
    this.currentTasks$ = store.pipe(
      select(TaskSelectors.selectCurrentTasksAll)
    );
  }

  ngOnInit() {
    this.store.dispatch(CurrentTasksPageActions.enter());
  }

  reorderItems(ids: string[]) {
    this.store.dispatch(TodoActions.reorderList({ ids }));
  }

  viewClearCompleted() {
    this.store.dispatch(CurrentTasksPageActions.clearCompleted());
  }

  viewNewCurrentTask() {
    this.store.dispatch(CurrentTasksPageActions.newCurrentTask());
  }

  toggleCompleteItem(item: CurrentTask) {
    const updatedTask: CurrentTask = toggleIsComplete(item, !item.isComplete);

    this.store.dispatch(
      CurrentTasksPageActions.saveItem({ currentTask: updatedTask })
    );
  }
}
