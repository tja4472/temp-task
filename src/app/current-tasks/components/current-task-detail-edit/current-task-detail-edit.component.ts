import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CurrentTask } from '@app/root-store/tasks-store/models';

import { CurrentTaskDetailEditPresenter } from './current-task-detail-edit.presenter';

@Component({
  selector: 'app-current-task-detail-edit',
  templateUrl: './current-task-detail-edit.component.html',
  styleUrls: ['./current-task-detail-edit.component.css'],
  viewProviders: [CurrentTaskDetailEditPresenter],
})
export class CurrentTaskDetailEditComponent implements OnInit {
  // tslint:disable-next-line: variable-name

  /*
  private _todo = null;

  @Input()
  set todo(todo: Todo) {
    console.log('##########CurrentTaskDetailComponent');
    this._todo = todo;
    this.presenter.init(todo);
  }
  get todo(): Todo {
    return this._todo;
  }
  */
  @Input() todo: CurrentTask;
  @Output() cancel = new EventEmitter<CurrentTask>();
  @Output() remove = new EventEmitter<CurrentTask>();
  @Output() checkout = new EventEmitter<CurrentTask>();

  get checkoutForm(): FormGroup {
    return this.presenter.form;
  }

  constructor(private presenter: CurrentTaskDetailEditPresenter) {}

  ngOnInit() {
    this.presenter.init(this.todo);
  }

  cancelClick() {
    this.cancel.emit(this.todo);
  }

  removeClick() {
    this.remove.emit(this.todo);
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}
