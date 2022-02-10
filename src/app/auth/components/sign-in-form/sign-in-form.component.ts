import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Credentials } from '@app/auth/models/credentials.model';

import { SignInFormPresenter } from './sign-in-form.presenter';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
  viewProviders: [SignInFormPresenter],
})
export class SignInFormComponent implements OnInit {
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
  readonly SignUpClicked = new EventEmitter();

  @Output()
  readonly submitted = new EventEmitter<Credentials>();

  get viewForm(): FormGroup {
    return this.presenter.form;
  }

  constructor(private presenter: SignInFormPresenter) {
    this.presenter.init();
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  viewSignUpClick() {
    this.SignUpClicked.emit();
  }

  viewOnSubmit() {
    const value: Credentials = this.presenter.checkout();

    this.submitted.emit(value);
  }
}
