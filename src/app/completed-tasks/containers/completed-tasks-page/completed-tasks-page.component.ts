import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CompletedTasksPageActions } from '@app/root-store/tasks-store/actions';
import { CompletedTask } from '@app/root-store/tasks-store/models';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Component({
  selector: 'app-completed-tasks-page',
  templateUrl: './completed-tasks-page.component.html',
  styleUrls: ['./completed-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedTasksPageComponent implements OnDestroy, OnInit {
  completedTasks$: Observable<CompletedTask[]>;
  viewSearchQuery$: Observable<string>;

  constructor(private store: Store<{}>) {
    this.viewSearchQuery$ = store.pipe(
      select(TaskSelectors.selectCompletedTasksQuery),
      take(1)
    );

    this.completedTasks$ = store.pipe(
      // select(TaskSelectors.selectCompletedTasksAll)
      select(TaskSelectors.selectCompletedTasksQueried)
    );
  }

  ngOnDestroy(): void {
    // this.store.dispatch(CompletedTasksPageActions.destroyed());
  }

  ngOnInit() {
    // this.store.dispatch(CompletedTasksPageActions.entered());
  }

  viewSearch(query: string) {
    this.store.dispatch(CompletedTasksPageActions.search({ query }));
  }

  toggleCompleteItem(item: CompletedTask) {
    this.store.dispatch(
      CompletedTasksPageActions.itemToggled({ todoCompleted: item })
    );
  }
}
