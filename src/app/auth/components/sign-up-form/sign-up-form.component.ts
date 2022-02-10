import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Credentials } from '@app/auth/models/credentials.model';

import { SignUpFormPresenter } from './sign-up-form.presenter';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
  viewProviders: [SignUpFormPresenter],
})
export class SignUpFormComponent implements OnInit {
  @Input()
  errorMessage: string | null;

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.presenter.disable();
    } else {
      this.presenter.enable();
    }
  }

  @Output()
  readonly submitted = new EventEmitter<Credentials>();

  get viewForm(): FormGroup {
    return this.presenter.form;
  }

  constructor(private presenter: SignUpFormPresenter) {
    this.presenter.init();
  }

  ngOnInit() {}

  viewOnSubmit() {
    const value: Credentials = this.presenter.checkout();

    this.submitted.emit(value);
  }
}
