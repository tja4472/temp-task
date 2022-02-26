import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Store } from '@ngrx/store';

// import { TaskListsRootActions } from '@app/tasks/actions';

@Component({
  selector: 'app-task-lists-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./task-lists-root.component.css'],
})
export class TaskListsRootComponent implements OnDestroy, OnInit {
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // this.store.dispatch(TaskListsRootActions.destroyed());
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  constructor(private store: Store<{}>) {}
}
