import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TaskListListItem } from '@app/root-store/tasks-store/models';

import { TaskListDetailNewPresenter } from './task-list-detail-new.presenter';

@Component({
  selector: 'app-task-list-detail-new',
  templateUrl: './task-list-detail-new.component.html',
  styleUrls: ['./task-list-detail-new.component.css'],
  viewProviders: [TaskListDetailNewPresenter],
})
export class TaskListDetailNewComponent implements OnInit {
  @Input() completedTask: TaskListListItem;
  @Output() cancel = new EventEmitter<TaskListListItem>();
  @Output() checkout = new EventEmitter<TaskListListItem>();

  get checkoutForm(): FormGroup {
    return this.presenter.form;
  }

  constructor(private presenter: TaskListDetailNewPresenter) {}

  ngOnInit() {
    this.presenter.init(this.completedTask);
  }

  cancelClick() {
    this.cancel.emit(this.completedTask);
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}
