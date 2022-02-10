// https://github.com/tja4472/wiki/wiki/NgRx-Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import {
  CompletedTaskListComponent,
  SearchComponent,
} from '@app/completed-tasks/components';
import { CompletedTasksPageComponent } from '@app/completed-tasks/containers';
import { MaterialModule } from '@app/material';
import { CompletedTasksPageActions } from '@app/root-store/tasks-store/actions';
import {
  taskFeatureKey,
  TaskState,
} from '@app/root-store/tasks-store/reducers';

import { cold } from 'jasmine-marbles';

// describe('example01-' + CompletedTasksPageComponent.name, () => {
describe('example01-CompletedTasksPageComponent', () => {
  let component: CompletedTasksPageComponent;
  let fixture: ComponentFixture<CompletedTasksPageComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        // RouterTestingModule,
      ],
      providers: [provideMockStore()],
      declarations: [
        CompletedTasksPageComponent,
        SearchComponent,
        CompletedTaskListComponent,
      ],
    });

    fixture = TestBed.createComponent(CompletedTasksPageComponent);
    store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch').mockImplementation(() => {});
    component = fixture.componentInstance;
  });

  it('should dispatch a CompletedTasksPageActions.search action on search', () => {
    const $event = 'search term';
    const action = CompletedTasksPageActions.search({ query: $event });

    component.viewSearch($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should have query', () => {
    const state: {
      [taskFeatureKey]: Partial<TaskState>;
    } = {
      [taskFeatureKey]: {
        'todo-completed': {
          ids: [],
          entities: {},
          loaded: true,
          loading: false,
          query: 'query-text',
        },
      },
    };

    store.setState(state);
    const expected = cold('(a|)', { a: 'query-text' });
    expect(component.viewSearchQuery$).toBeObservable(expected);
  });
});
