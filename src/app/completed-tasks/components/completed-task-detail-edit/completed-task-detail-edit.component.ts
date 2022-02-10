import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CompletedTask } from '@app/root-store/tasks-store/models';

import { CompletedTaskDetailEditPresenter } from './completed-task-detail-edit.presenter';

@Component({
  selector: 'app-completed-task-detail-edit',
  templateUrl: './completed-task-detail-edit.component.html',
  styleUrls: ['./completed-task-detail-edit.component.css'],
  viewProviders: [CompletedTaskDetailEditPresenter],
})
export class CompletedTaskDetailEditComponent implements OnInit {
  @Input() completedTask: CompletedTask;
  @Output() cancel = new EventEmitter<CompletedTask>();
  @Output() remove = new EventEmitter<CompletedTask>();
  @Output() checkout = new EventEmitter<CompletedTask>();

  get checkoutForm() {
    return this.presenter.form;
  }

  get formControlNames() {
    return this.presenter.formControlNames;
  }

  get isSubmitButtonDisabled(): boolean {
    return this.presenter.isSubmitButtonDisabled;
  }

  constructor(private presenter: CompletedTaskDetailEditPresenter) {}

  ngOnInit() {
    this.presenter.init(this.completedTask);
  }

  cancelClick() {
    this.cancel.emit(this.completedTask);
  }

  removeClick() {
    this.remove.emit(this.completedTask);
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}
