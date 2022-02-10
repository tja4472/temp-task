import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routeNames } from '@app/app-route-names';
import { AuthGuardService } from '@app/auth/services/auth-guard.service';
import { CompletedTasksRootGuardService } from '@app/services/completed-tasks-root-guard.service';

import {
  CompletedTaskDetailEditPageComponent,
  CompletedTasksPageComponent,
  CompletedTasksRootComponent,
} from './containers';
import { CompletedTaskDetailEditPageComponentGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: CompletedTasksRootComponent,
    canActivate: [AuthGuardService, CompletedTasksRootGuardService],
    children: [
      {
        path:
          routeNames.completedTasks.edit.path +
          '/:' +
          routeNames.completedTasks.edit.idParam,
        component: CompletedTaskDetailEditPageComponent,
        canActivate: [CompletedTaskDetailEditPageComponentGuard],
      },
      {
        path: '',
        component: CompletedTasksPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedTasksRoutingModule {}
