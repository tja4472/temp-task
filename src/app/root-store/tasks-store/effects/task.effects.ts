import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';
import { UserStoreSelectors } from '@app/root-store/user-store';

import { CompletedTaskDataService } from '../../../services/completed-task.data.service';
import { CurrentTaskDataService } from '../../../services/current-task.data.service';
import { Fb1DataService } from '../../../services/fb1.data.service';
import { TaskListDataService } from '../../../services/task-list.data.service';
import {
  CompletedTaskDetailEditPageActions,
  CompletedTasksPageActions,
  CurrentTaskDetailEditPageActions,
  CurrentTaskDetailNewPageActions,
  CurrentTasksPageActions,
  TaskListDetailEditPageActions,
  TaskListDetailNewPageActions,
  TaskListsPageActions,
} from '../actions';

/* =======================================
Improve typings of createEffect, help debugging
https://github.com/ngrx/platform/issues/2192

effect$ = createEffect(() => {
  return this.actions$.pipe(
    ...
  );
});

effectDispatchFalse$ = createEffect(
  () => {
    return this.actions$.pipe(
      ...
    );
  },
  { dispatch: false }
);
======================================= */

@Injectable()
export class TaskEffects {
  //#region Completed Tasks
  removeCompletedTask$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CompletedTaskDetailEditPageActions.removed),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(UserStoreSelectors.selectUserAndTaskListId)
            )
          )
        ),
        tap(([action, a]) => {
          if (a === null || a.taskListId === null) {
            return;
          }

          this.todoCompletedDataService.removeItem(
            action.completedTask.id,
            a.taskListId,
            a.user.id
          );
        })
      );
    },
    { dispatch: false }
  );

  savecompletedTask$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CompletedTaskDetailEditPageActions.saved),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(UserStoreSelectors.selectUserAndTaskListId)
            )
          )
        ),
        tap(([action, a]) => {
          if (a === null || a.taskListId === null) {
            return;
          }

          this.todoCompletedDataService.save(
            action.completedTask,
            a.taskListId,
            a.user.id
          );
        })
      );
    },
    { dispatch: false }
  );
  //#endregion

  //#region Task Lists
  newTaskList$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TaskListsPageActions.newTaskList),
        tap(() => {
          this.router.navigate([
            pathPrefix +
              routeNames.taskLists.path +
              pathPrefix +
              routeNames.taskLists.new.path,
          ]);
        })
      );
    },
    { dispatch: false }
  );

  removeTaskList$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TaskListDetailEditPageActions.removed),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(this.store.select(UserStoreSelectors.selectUser))
          )
        ),
        tap(([action, user]) => {
          if (user === null) {
            return;
          }

          this.todoListsDataService.removeItem(action.taskList.id, user.id);
        })
      );
    },
    { dispatch: false }
  );

  saveTaskList$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TaskListDetailNewPageActions.saved),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(this.store.select(UserStoreSelectors.selectUser))
          )
        ),
        tap(([action, user]) => {
          if (user === null) {
            return;
          }
          this.todoListsDataService.save(action.taskList, user.id);
        })
      );
    },
    { dispatch: false }
  );

  taskListDetailEditPageActionsSaved$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TaskListDetailEditPageActions.saved),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(this.store.select(UserStoreSelectors.selectUser))
          )
        ),
        tap(([action, user]) => {
          if (user === null) {
            return;
          }
          this.todoListsDataService.save(action.taskList, user.id);
        })
      );
    },
    { dispatch: false }
  );
  //#endregion
  //
  clearCompleted$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CurrentTasksPageActions.clearCompleted),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(UserStoreSelectors.selectUserAndTaskListId),
              this.store.select(TaskSelectors.selectCurrentTasksAll)
            )
          )
        ),
        tap(([action, a, tasks]) => {
          if (a === null || a.taskListId === null) {
            return;
          }
          const completedTasks = tasks.filter((t) => t.isComplete);

          this.fb1DataService.clearCompletedTodos(
            completedTasks,
            a.taskListId,
            a.user.id
          );
        })
      );
    },
    { dispatch: false }
  );

  completedTaskToggled$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CompletedTasksPageActions.itemToggled),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(UserStoreSelectors.selectUserAndTaskListId)
            )
          )
        ),
        tap(([action, a]) => {
          if (a === null || a.taskListId === null) {
            return;
          }

          this.fb1DataService.moveToCurrent(
            action.todoCompleted,
            a.taskListId,
            a.user.id
          );
        })
      );
    },
    { dispatch: false }
  );

  completedTaskDetailEditPageComponent$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CompletedTaskDetailEditPageActions.cancelled,
          CompletedTaskDetailEditPageActions.removed,
          CompletedTaskDetailEditPageActions.saved
        ),
        tap(({ completedTask }) => {
          this.router.navigate([
            pathPrefix + routeNames.completedTasks.path,
            { id: completedTask.id },
          ]);
        })
      );
    },
    { dispatch: false }
  );

  newCurrentTask$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CurrentTasksPageActions.newCurrentTask),
        tap(() => {
          this.router.navigate([
            pathPrefix + routeNames.currentTasks.path,
            routeNames.currentTasks.new.path,
          ]);
        })
      );
    },
    { dispatch: false }
  );

  enterCurrentTasksPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CurrentTasksPageActions.enter),
        tap(() => {
          /*
          this.analytics.logEvent('enterCurrentTasksPage', {
            level: '10',
            difficulty: 'expert',
          });
*/
        })
      );
    },
    { dispatch: false }
  );

  currentTaskDetailEditPageComponent$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CurrentTaskDetailEditPageActions.cancelled,
          CurrentTaskDetailEditPageActions.removed,
          CurrentTaskDetailEditPageActions.saved
        ),
        tap(({ currentTask }) => {
          this.router.navigate([
            pathPrefix + routeNames.currentTasks.path,
            { id: currentTask.id },
          ]);
        })
      );
    },
    { dispatch: false }
  );

  currentTaskDetailNewPageComponent$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CurrentTaskDetailNewPageActions.cancelled,
          CurrentTaskDetailNewPageActions.saved
        ),
        tap(() => {
          this.router.navigate([pathPrefix + routeNames.currentTasks.path]);
        })
      );
    },
    { dispatch: false }
  );

  removeCurrentTodo$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CurrentTaskDetailEditPageActions.removed),

        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(UserStoreSelectors.selectUserAndTaskListId)
            )
          )
        ),

        tap(([action, a]) => {
          if (a === null || a.taskListId === null) {
            return;
          }

          this.todoDataService.removeItem(
            action.currentTask.id,
            a.taskListId,
            a.user.id
          );
        })
      );
    },
    { dispatch: false }
  );

  saveCurrentTodo$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CurrentTaskDetailNewPageActions.saved,
          CurrentTaskDetailEditPageActions.saved,
          CurrentTasksPageActions.saveItem
        ),

        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(UserStoreSelectors.selectUserAndTaskListId)
            )
          )
        ),
        tap(([action, a]) => {
          if (a === null || a.taskListId === null) {
            return;
          }

          this.todoDataService.save(
            action.currentTask,
            a.taskListId,
            a.user.id
          );
        })
      );
    },
    { dispatch: false }
  );

  taskListDetailEditPageComponent$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          TaskListDetailEditPageActions.cancelled,
          TaskListDetailEditPageActions.removed,
          TaskListDetailEditPageActions.saved
        ),
        tap(({ taskList }) => {
          this.router.navigate([
            pathPrefix + routeNames.taskLists.path,
            { id: taskList.id },
          ]);
        })
      );
    },
    { dispatch: false }
  );

  taskListDetailNewPageComponent$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          TaskListDetailNewPageActions.cancelled,
          TaskListDetailNewPageActions.saved
        ),
        tap(() => {
          this.router.navigate([pathPrefix + routeNames.taskLists.path]);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    // private analytics: AngularFireAnalytics,
    private fb1DataService: Fb1DataService,
    private todoDataService: CurrentTaskDataService,
    private todoCompletedDataService: CompletedTaskDataService,
    private todoListsDataService: TaskListDataService,
    private store: Store<{}>,
    private router: Router
  ) {}
}
