import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routeNames } from '@app/app-route-names';
import { AuthGuardService } from '@app/auth/services/auth-guard.service';

import {
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
  TaskListsPageComponent,
  TaskListsRootComponent,
} from './containers';
import { TaskListDetailEditPageComponentGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: TaskListsRootComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path:
          routeNames.taskLists.edit.path +
          '/:' +
          routeNames.taskLists.edit.idParam,
        component: TaskListDetailEditPageComponent,
        canActivate: [TaskListDetailEditPageComponentGuard],
      },
      {
        path: routeNames.taskLists.new.path,
        component: TaskListDetailNewPageComponent,
      },
      {
        path: '',
        component: TaskListsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskListsRoutingModule {}
