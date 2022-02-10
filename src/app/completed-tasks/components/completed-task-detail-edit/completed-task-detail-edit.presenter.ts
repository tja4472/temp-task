import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ControlNames, getFormControlNames } from '@app/core/utility';
import {
  typedFormControl,
  typedFormGroup,
} from '@app/external-libs/ngx-forms-typed/forms-typed';
import { CompletedTask } from '@app/root-store/tasks-store/models';

interface Model {
  name: string;
  description: string | null;
  isComplete: boolean;
}

/*
type ModelControls = { [key in keyof Model]: AbstractControl };
type ModelFormGroup = FormGroup & { value: Model; controls: ModelControls };
*/

// ===
/*
type ObjectAsMap<T> = { [K in keyof T]-?: K };
type a = ObjectAsMap<Model>;
*/
/*
type a = {
    name: "name";
    description: "description";
    isComplete: "isComplete";
}
*/
// ===

@Injectable()
export class CompletedTaskDetailEditPresenter {
  /*
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(),
    isComplete: new FormControl(),
  } as ModelControls) as ModelFormGroup;
  */

  form = typedFormGroup<Model>({
    name: typedFormControl<string>('', Validators.required),
    description: typedFormControl<string | null>(),
    isComplete: typedFormControl<boolean>(),
  });

  #formControlNames: ControlNames<Model>;

  public get formControlNames() {
    return this.#formControlNames;
  }

  public get isSubmitButtonDisabled(): boolean {
    return !(this.form.dirty && this.form.valid);
  }

  initialData: CompletedTask;

  constructor(private formBuilder: FormBuilder) {
    this.#formControlNames = getFormControlNames<Model>(this.form.controls);
  }

  init(todo: CompletedTask) {
    this.initialData = { ...todo };
    this.form.setValue({
      name: this.initialData.name,
      description: this.initialData.description,
      isComplete: this.initialData.isComplete,
    });
    /*
    this.form.setValue({
      name: this.initialData.name,
      description: this.initialData.description,
      isComplete: this.initialData.isComplete,
    } as Model);
    */
    /*
    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
      description: [this.initialData.description],
      isComplete: [this.initialData.isComplete],
    });
*/
  }

  /*
    const controls: ControlNames<Model> = {
      name: 'name',
      description: 'description',
      isComplete: 'isComplete',
    };
*/
  /*
  formControlNames(): ControlNames<Model> {
    type ControlNamesUpdateable<T> = { [K in keyof T]-?: string };

    const controlsA: Partial<ControlNamesUpdateable<Model>> = {};


    for (const key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        controlsA[key as keyof ControlNames<Model>] = key;
      }
    }

    console.log('controlsA>', controlsA);

    return controlsA as ControlNames<Model>;
  }
*/

  checkout(): CompletedTask {
    const todoData: CompletedTask = { ...this.initialData, ...this.form.value };
    this.form.reset();

    return todoData;
  }
}
