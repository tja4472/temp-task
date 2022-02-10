import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { User } from '@app/models';
import { TaskListListItem } from '@app/root-store/tasks-store/models';
import { TaskListSelectors } from '@app/root-store/tasks-store/selectors';
import {
  UserStoreActions,
  UserStoreSelectors,
} from '@app/root-store/user-store';

import { SidenavActions } from './actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @ViewChild('drawer', { static: true }) drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  viewNavigation = [
    { link: pathPrefix + routeNames.home.path, label: 'Home Page' },
    { link: pathPrefix + routeNames.signIn.path, label: 'Sign In' },
    {
      link: pathPrefix + routeNames.signInComponentStore.path,
      label: 'Sign In(ComponentStore)',
    },
    {
      link: pathPrefix + routeNames.currentTasks.path,
      label: 'Current Tasks Page',
    },
    {
      link: pathPrefix + routeNames.completedTasks.path,
      label: 'Completed Tasks Page',
    },
    { link: pathPrefix + routeNames.taskLists.path, label: 'Task Lists Page' },
  ];

  view$: Observable<{ user: User; taskListId: string | null } | null>;
  selected = 'Cn7vwq2PCR6uj2u5nw3d';
  taskLists$: Observable<TaskListListItem[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    router: Router,
    private store: Store<{}>
  ) {
    this.view$ = this.store.select(UserStoreSelectors.selectUserAndTaskListId);
    /*
    this.view$ = this.store.select(UserStoreSelectors.selectUser).pipe(
      withLatestFrom(this.store.select(UserStoreSelectors.selectTaskListId)),
      map(([user, taskListId]) => {
        if (user === null) {
          return null;
        }
        return { user, taskListId };
      })
    );
*/

    this.taskLists$ = store.pipe(select(TaskListSelectors.selectAll));

    // Close sidenav on a handset device after route click.
    router.events
      .pipe(
        withLatestFrom(this.isHandset$),
        filter(([a, b]) => b && a instanceof NavigationEnd)
      )
      .subscribe((_) => this.drawer.close());
  }

  public viewtodoListsSelectChange(todoListId: any): void {
    this.store.dispatch(
      SidenavActions.selectTaskListId({ taskListId: todoListId.value })
    );
  }
}
