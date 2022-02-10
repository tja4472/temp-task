import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { RootState } from '@app/root-store/reducers';
import { TaskListListItem } from '@app/root-store/tasks-store/models';
import { TaskState } from '@app/root-store/tasks-store/reducers';
import {
  TaskListSelectors,
  TaskSelectors,
} from '@app/root-store/tasks-store/selectors';

import { TaskListDetailEditPageComponentGuardActions } from '../actions';

import { TaskListDetailEditPageComponentGuard } from './task-list-detail-edit-page-component.guard';

import { getTestScheduler } from 'jasmine-marbles';

describe(TaskListDetailEditPageComponentGuard.name, () => {
  let guard: TaskListDetailEditPageComponentGuard;
  let mockStore: MockStore;
  let router: Router;
  let selectLoaded: MemoizedSelector<TaskState, boolean>;
  let selectTaskListFromRoute: MemoizedSelector<
    RootState,
    TaskListListItem | undefined
  >;

  let mockStoreDispatchSpy: jasmine.Spy;
  let routerNavigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TaskListDetailEditPageComponentGuard, provideMockStore()],
    });

    mockStore = TestBed.inject(MockStore);
    mockStoreDispatchSpy = spyOn(mockStore, 'dispatch');

    router = TestBed.inject(Router);
    routerNavigateSpy = spyOn(router, 'navigate');

    guard = TestBed.inject(TaskListDetailEditPageComponentGuard);

    selectLoaded = mockStore.overrideSelector(
      TaskListSelectors.selectLoaded,
      false
    );
    selectTaskListFromRoute = mockStore.overrideSelector(
      TaskSelectors.selectTaskListFromRoute,
      undefined
    );
  });

  it('canActivate should return Observable<false> after 5000ms if task lists do not load', () => {
    const scheduler = getTestScheduler();
    scheduler.run(({ expectObservable }) => {
      expectObservable(guard.canActivate()).toBe('5000ms (a|)', { a: false });
    });

    // suppress 'has no expectations' warnings.
    expect().nothing();
  });

  it('canActivate should return Observable<false> if url task list does not exist in store', () => {
    selectLoaded.setResult(true);

    const scheduler = getTestScheduler();
    scheduler.run(({ expectObservable }) => {
      expectObservable(guard.canActivate()).toBe('(a|)', { a: false });
    });

    const action = TaskListDetailEditPageComponentGuardActions.taskListNotFound();
    expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(1);
    expect(mockStoreDispatchSpy).toHaveBeenCalledWith(action);

    expect(routerNavigateSpy).toHaveBeenCalledTimes(1);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/404'], {
      skipLocationChange: true,
    });
  });

  it('canActivate should return Observable<true> if url task list does exist in store', () => {
    selectLoaded.setResult(true);

    const item: TaskListListItem = {
      id: 's',
      name: 'd',
    };
    selectTaskListFromRoute.setResult(item);

    const scheduler = getTestScheduler();
    scheduler.run(({ expectObservable }) => {
      expectObservable(guard.canActivate()).toBe('(a|)', { a: true });
    });

    expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(0);
    expect(routerNavigateSpy).toHaveBeenCalledTimes(0);
  });
});
