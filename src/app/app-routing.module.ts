import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { TaskListsGuard } from '@app/task-lists/guards/task-lists.guard';

import { AuthGuardService } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers';

const routes: Routes = [
  {
    path: routeNames.completedTasks.path,
    loadChildren: () =>
      import('./completed-tasks').then((m) => m.CompletedTasksModule),
    canLoad: [AuthGuardService],
  },
  {
    path: routeNames.currentTasks.path,
    loadChildren: () =>
      import('./current-tasks').then((m) => m.CurrentTasksModule),
    canLoad: [AuthGuardService],
  },
  {
    path: routeNames.taskLists.path,
    loadChildren: () => import('./task-lists').then((m) => m.TaskListsModule),
    canLoad: [AuthGuardService, TaskListsGuard],
  },
  {
    path: routeNames.tasks.path,
    redirectTo: pathPrefix + routeNames.currentTasks.path,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: pathPrefix + routeNames.home.path,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
