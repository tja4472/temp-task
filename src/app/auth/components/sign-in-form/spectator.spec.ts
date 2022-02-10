import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { SignInFormComponent } from './sign-in-form.component';

import {
  byTestId,
  byText,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator';

describe('SignInFormComponent(spectator)', () => {
  let spectator: Spectator<SignInFormComponent>;
  // const createComponent = createComponentFactory(SignInFormComponent);
  const createComponent = createComponentFactory<SignInFormComponent>({
    component: SignInFormComponent,
    imports: [
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
    ],
  });
  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('show validation error', () => {
    expect(spectator.component.viewForm.dirty).toBeFalsy('dirty');
    expect(spectator.component.viewForm.pristine).toBeTruthy('pristine');
    expect(spectator.component.viewForm.touched).toBeFalsy('touched');
    expect(spectator.component.viewForm.valid).toBeFalsy('valid');

    const userNameControl = spectator.query(byTestId('username'));
    if (userNameControl === null) {
      return;
    }

    // touch control to show validation error.
    spectator.blur(userNameControl);

    expect(spectator.component.viewForm.dirty).toBeFalsy('dirty');
    expect(spectator.component.viewForm.pristine).toBeTruthy('pristine');
    expect(spectator.component.viewForm.touched).toBeTruthy('touched');
    expect(spectator.component.viewForm.valid).toBeFalsy('valid');

    expect(spectator.query(byText('User Name is required'))).not.toBeNull(
      'user name alert'
    );

    spectator.typeInElement('tim', userNameControl);

    expect(spectator.component.viewForm.dirty).toBeTruthy('dirty');
    expect(spectator.component.viewForm.pristine).toBeFalsy('pristine');
    expect(spectator.component.viewForm.touched).toBeTruthy('touched');
    expect(spectator.component.viewForm.valid).toBeFalsy('valid');

    expect(spectator.query(byText('User Name is required'))).toBeNull(
      'user name alert'
    );

    // Clear user name
    spectator.typeInElement('', userNameControl);

    expect(spectator.component.viewForm.valid).toBeFalsy('valid');
    expect(spectator.query(byText('User Name is required'))).not.toBeNull(
      'user name alert'
    );
  });
});
