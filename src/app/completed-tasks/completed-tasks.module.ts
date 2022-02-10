import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material';

import { CompletedTasksRoutingModule } from './completed-tasks-routing.module';
import {
  CompletedTaskDetailEditComponent,
  CompletedTaskListComponent,
  SearchComponent,
} from './components';
import {
  CompletedTaskDetailEditPageComponent,
  CompletedTasksPageComponent,
  CompletedTasksRootComponent,
} from './containers';

export const COMPONENTS = [
  CompletedTaskDetailEditComponent,
  CompletedTaskListComponent,
  SearchComponent,
];

export const CONTAINERS = [
  CompletedTaskDetailEditPageComponent,
  CompletedTasksPageComponent,
  CompletedTasksRootComponent,
];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CompletedTasksRoutingModule,
  ],
})
export class CompletedTasksModule {}
