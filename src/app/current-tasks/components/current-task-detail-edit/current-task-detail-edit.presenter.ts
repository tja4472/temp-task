import { Injectable, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  CurrentTask,
  getCompletedTimestamp,
} from '@app/root-store/tasks-store/models';

@Injectable()
export class CurrentTaskDetailEditPresenter implements OnDestroy {
  form: FormGroup;

  initialData: CurrentTask;

  get completedTimestampControl(): AbstractControl {
    const result = this.form.get('completedTimestamp');

    if (result === null) {
      throw new Error('completedTimestamp AbstractControl is null');
    }

    return result;
  }

  get isCompleteControl(): AbstractControl {
    const result = this.form.get('isComplete');

    if (result === null) {
      throw new Error('isComplete AbstractControl is null');
    }

    return result;
  }

  private unsubscribe: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder) {}

  init(todo: CurrentTask) {
    this.initialData = { ...todo };

    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
      description: [this.initialData.description],
      isComplete: [this.initialData.isComplete],
      completedTimestamp: [this.initialData.completedTimestamp],
    });

    this.isCompleteControl.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value: boolean) => {
        this.completedTimestampControl.setValue(getCompletedTimestamp(value));
      });
  }

  checkout(): CurrentTask {
    const todoData: CurrentTask = { ...this.initialData, ...this.form.value };
    this.form.reset();

    return todoData;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
