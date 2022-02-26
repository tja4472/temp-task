import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { CurrentTasksRootActions } from '@app/root-store/tasks-store/actions';

@Component({
  selector: 'app-current-tasks-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./current-tasks-root.component.css'],
})
export class CurrentTasksRootComponent implements OnDestroy, OnInit {
  ngOnDestroy(): void {
    this.store.dispatch(CurrentTasksRootActions.destroyed());
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  constructor(private store: Store<{}>) {}
}
