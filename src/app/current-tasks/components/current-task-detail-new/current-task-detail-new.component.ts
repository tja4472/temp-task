import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CurrentTask } from '@app/root-store/tasks-store/models';

import { CurrentTaskDetailNewPresenter } from './current-task-detail-new.presenter';

@Component({
  selector: 'app-current-task-detail-new',
  templateUrl: './current-task-detail-new.component.html',
  styleUrls: ['./current-task-detail-new.component.css'],
  viewProviders: [CurrentTaskDetailNewPresenter],
})
export class CurrentTaskDetailNewComponent implements OnInit {
  @Input() todo: CurrentTask;

  @Output() cancel = new EventEmitter<CurrentTask>();
  @Output() checkout = new EventEmitter<CurrentTask>();

  get checkoutForm(): FormGroup {
    return this.presenter.form;
  }

  constructor(private presenter: CurrentTaskDetailNewPresenter) {}

  ngOnInit() {
    this.presenter.init(this.todo);
  }

  cancelClick() {
    this.cancel.emit(this.todo);
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}
