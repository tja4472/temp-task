import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TaskEffects } from './effects/task.effects';
import { TodoCompletedEffects } from './effects/todo-completed.effect';
import { TodoEffects } from './effects/todo.effect';
import * as fromTask from './reducers';
import { TaskListEffects } from './task-list-store/effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTask.taskFeatureKey, fromTask.taskReducers),
    EffectsModule.forFeature([
      TaskEffects,
      TaskListEffects,
      TodoEffects,
      TodoCompletedEffects,
    ]),
  ],
  providers: [TaskEffects, TaskListEffects, TodoEffects, TodoCompletedEffects],
})
export class TasksStoreModule {}
