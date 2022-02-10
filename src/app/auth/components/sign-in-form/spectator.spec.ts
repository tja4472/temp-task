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

describe.skip('SignInFormComponent(spectator)', () => {
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
    expect(spectator.component.viewForm.dirty).toBeFalsy();
    expect(spectator.component.viewForm.pristine).toBeTruthy();
    expect(spectator.component.viewForm.touched).toBeFalsy();
    expect(spectator.component.viewForm.valid).toBeFalsy();

    const userNameControl = spectator.query(byTestId('username'));
    if (userNameControl === null) {
      return;
    }

    // touch control to show validation error.
    spectator.blur(userNameControl);

    expect(spectator.component.viewForm.dirty).toBeFalsy();
    expect(spectator.component.viewForm.pristine).toBeTruthy();
    // expect(spectator.component.viewForm.touched).toBeTruthy();
    expect(spectator.component.viewForm.valid).toBeFalsy();

    // expect(spectator.query(byText('User Name is required'))).not.toBeNull();

    spectator.typeInElement('tim', userNameControl);

    expect(spectator.component.viewForm.dirty).toBeTruthy();
    expect(spectator.component.viewForm.pristine).toBeFalsy();
    // expect(spectator.component.viewForm.touched).toBeTruthy();
    expect(spectator.component.viewForm.valid).toBeFalsy();

    expect(spectator.query(byText('User Name is required'))).toBeNull();

    // Clear user name
    spectator.typeInElement('', userNameControl);

    expect(spectator.component.viewForm.valid).toBeFalsy();
    expect(spectator.query(byText('User Name is required'))).not.toBeNull();
  });
});
