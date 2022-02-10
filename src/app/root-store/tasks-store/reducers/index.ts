import { Action, ActionReducerMap, combineReducers } from '@ngrx/store';

import * as fromRoot from '@app/root-store/reducers';

import * as fromTodoLists from '../task-list-store/reducer';
import * as fromTodoListsState from '../task-list-store/state';

import * as fromTodoCompleted from './todo-completed.reducer';
import * as fromTodo from './todo.reducer';

export const taskFeatureKey = 'task';

export interface TaskState {
  [fromTodo.todoFeatureKey]: fromTodo.State;
  [fromTodoCompleted.todoCompletedFeatureKey]: fromTodoCompleted.State;
  [fromTodoLists.featureKey]: fromTodoListsState.State;
}

// export const initialState: TaskState = {};

export interface State extends fromRoot.RootState {
  [taskFeatureKey]: TaskState;
}

export const taskReducers: ActionReducerMap<TaskState> = {
  [fromTodo.todoFeatureKey]: fromTodo.reducer,
  [fromTodoCompleted.todoCompletedFeatureKey]: fromTodoCompleted.reducer,
  [fromTodoLists.featureKey]: fromTodoLists.reducer,
};
