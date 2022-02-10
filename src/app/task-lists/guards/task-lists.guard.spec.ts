import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TaskState } from '@app/root-store/tasks-store/reducers';
import { TaskListSelectors } from '@app/root-store/tasks-store/selectors';

import { TaskListsGuardActions } from '../actions';

import { TaskListsGuard } from './task-lists.guard';

import { getTestScheduler } from 'jasmine-marbles';

describe(TaskListsGuard.name, () => {
  let guard: TaskListsGuard;
  let mockStore: MockStore;
  let taskListSelectorsSelectLoaded: MemoizedSelector<TaskState, boolean>;

  let mockStoreDispatchSpy: jasmine.Spy;

  const dummyUrl = 'dummy/url';
  const route: Route = { path: dummyUrl };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TaskListsGuard, provideMockStore()],
    });

    mockStore = TestBed.inject(MockStore);
    mockStoreDispatchSpy = spyOn(mockStore, 'dispatch');

    guard = TestBed.inject(TaskListsGuard);

    taskListSelectorsSelectLoaded = mockStore.overrideSelector(
      TaskListSelectors.selectLoaded,
      false
    );
  });

  describe('canLoad', () => {
    it('should return Observable<false> after 5000ms if task lists do not load', () => {
      const scheduler = getTestScheduler();
      scheduler.run(({ expectObservable }) => {
        expectObservable(guard.canLoad(route)).toBe('5000ms (a|)', {
          a: false,
        });
      });

      const action = TaskListsGuardActions.timeout({
        requestedUrl: `/${dummyUrl}`,
      });
      expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(1);
      expect(mockStoreDispatchSpy).toHaveBeenCalledWith(action);

      // suppress 'has no expectations' warnings.
      // expect().nothing();
    });

    it('should return Observable<true> if url task list does exist in store', () => {
      taskListSelectorsSelectLoaded.setResult(true);
      const scheduler = getTestScheduler();
      scheduler.run(({ expectObservable }) => {
        expectObservable(guard.canLoad(route)).toBe('(a|)', { a: true });
      });

      // suppress 'has no expectations' warnings.
      expect().nothing();
    });
  });
});
