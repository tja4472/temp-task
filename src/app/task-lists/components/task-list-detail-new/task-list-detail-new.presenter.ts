import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TaskListListItem } from '@app/root-store/tasks-store/models';

@Injectable()
export class TaskListDetailNewPresenter {
  form: FormGroup;

  initialData: TaskListListItem;

  constructor(private formBuilder: FormBuilder) {}

  init(todo: TaskListListItem) {
    this.initialData = { ...todo };

    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
    });
  }

  checkout(): TaskListListItem {
    const todoData: TaskListListItem = {
      ...this.initialData,
      ...this.form.value,
    };
    this.form.reset();

    return todoData;
  }
}
