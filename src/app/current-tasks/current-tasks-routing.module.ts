import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routeNames } from '@app/app-route-names';
import { AuthGuardService } from '@app/auth/services/auth-guard.service';
import { CurrentTasksRootGuardService } from '@app/services/current-tasks-root-guard.service';

import {
  CurrentTaskDetailEditPageComponent,
  CurrentTaskDetailNewPageComponent,
  CurrentTasksPageComponent,
  CurrentTasksRootComponent,
} from './containers';
import { CurrentTaskDetailEditPageComponentGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: CurrentTasksRootComponent,
    canActivate: [AuthGuardService, CurrentTasksRootGuardService],
    children: [
      {
        path:
          routeNames.currentTasks.edit.path +
          '/:' +
          routeNames.currentTasks.edit.idParam,
        component: CurrentTaskDetailEditPageComponent,
        canActivate: [CurrentTaskDetailEditPageComponentGuard],
      },
      {
        path: routeNames.currentTasks.new.path,
        component: CurrentTaskDetailNewPageComponent,
      },
      {
        path: '',
        component: CurrentTasksPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentTasksRoutingModule {}
