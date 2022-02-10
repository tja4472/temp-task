import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material';

import {
  CurrentTaskDetailEditComponent,
  CurrentTaskDetailNewComponent,
  CurrentTaskListComponent,
} from './components';
import {
  CurrentTaskDetailEditPageComponent,
  CurrentTaskDetailNewPageComponent,
  CurrentTasksPageComponent,
  CurrentTasksRootComponent,
} from './containers';
import { CurrentTasksRoutingModule } from './current-tasks-routing.module';

export const COMPONENTS = [
  CurrentTaskDetailEditComponent,
  CurrentTaskDetailNewComponent,
  CurrentTaskListComponent,
];

export const CONTAINERS = [
  CurrentTaskDetailEditPageComponent,
  CurrentTaskDetailNewPageComponent,
  CurrentTasksPageComponent,
  CurrentTasksRootComponent,
];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CurrentTasksRoutingModule,
  ],
})
export class CurrentTasksModule {}
