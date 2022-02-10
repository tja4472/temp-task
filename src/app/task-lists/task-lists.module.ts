import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material';

import {
  TaskListDetailEditComponent,
  TaskListDetailNewComponent,
  TaskListListComponent,
} from './components';
import {
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
  TaskListsPageComponent,
  TaskListsRootComponent,
} from './containers';
import { TaskListsRoutingModule } from './task-lists-routing.module';

export const COMPONENTS = [
  TaskListDetailEditComponent,
  TaskListDetailNewComponent,
  TaskListListComponent,
];

export const CONTAINERS = [
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
  TaskListsPageComponent,
  TaskListsRootComponent,
];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TaskListsRoutingModule,
  ],
})
export class TaskListsModule {}
