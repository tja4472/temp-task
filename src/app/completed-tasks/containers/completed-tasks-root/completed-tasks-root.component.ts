import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { CompletedTasksRootActions } from '@app/root-store/tasks-store/actions';

@Component({
  selector: 'app-completed-tasks-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./completed-tasks-root.component.css'],
})
export class CompletedTasksRootComponent implements OnDestroy, OnInit {
  ngOnDestroy(): void {
    this.store.dispatch(CompletedTasksRootActions.destroyed());
  }

  ngOnInit(): void {}

  constructor(private store: Store<{}>) {}
}
