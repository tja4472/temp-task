import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { SignInFormComponent } from './sign-in-form.component';

import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

async function setup({
  errorMessage = null,
  pending = false,
  submittedSpy = jasmine.createSpy('submitted'),
  signUpClickedSpy = jasmine.createSpy('signUpClicked'),
}: {
  errorMessage?: null | string;
  pending?: boolean;
  submittedSpy?: jasmine.Spy<jasmine.Func>;
  signUpClickedSpy?: jasmine.Spy<jasmine.Func>;
}) {
  const component = await render(SignInFormComponent, {
    imports: [
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
    ],
    componentProperties: {
      errorMessage,
      pending,
      submitted: {
        emit: submittedSpy,
      } as any,
      SignUpClicked: {
        emit: signUpClickedSpy,
      } as any,
    },
  });

  const userNameControl = screen.getByTestId('username');
  const passwordControl = screen.getByTestId('password');

  const signInButtonControl = screen.getByRole('button', {
    name: /sign in/i,
  });
  const signUpButtonControl = screen.getByRole('button', {
    name: /sign up/i,
  });

  return {
    component,
    submittedSpy,
    signUpClickedSpy,
    userNameControl,
    passwordControl,
    signInButtonControl,
    signUpButtonControl,
  };
}

describe('@testing-library/angular', () => {
  it('show validation error', async () => {
    const { component, userNameControl } = await setup({});

    const componentInstance = component.fixture.componentInstance;

    expect(componentInstance.viewForm.dirty).toBeFalsy('dirty');
    expect(componentInstance.viewForm.pristine).toBeTruthy('pristine');
    expect(componentInstance.viewForm.touched).toBeFalsy('touched');
    expect(componentInstance.viewForm.valid).toBeFalsy('valid');

    // touch control to show validation error.
    fireEvent.blur(userNameControl);

    expect(componentInstance.viewForm.dirty).toBeFalsy('dirty');
    expect(componentInstance.viewForm.pristine).toBeTruthy('pristine');
    expect(componentInstance.viewForm.touched).toBeTruthy('touched');
    expect(componentInstance.viewForm.valid).toBeFalsy('valid');

    expect(screen.queryByText('User Name is required')).not.toBeNull();

    // userEvent.type doesn't toggle form.dirty
    // fixed in? @testing-library/user-event": "12.1.6"
    userEvent.type(userNameControl, 'tim');
    /*
    fireEvent.input(userNameControl, {
      target: {
        value: 'dfdf',
      },
    });
*/
    expect(componentInstance.viewForm.dirty).toBeTruthy('dirty');
    expect(componentInstance.viewForm.pristine).toBeFalsy('pristine');
    expect(componentInstance.viewForm.touched).toBeTruthy('touched');
    expect(componentInstance.viewForm.valid).toBeFalsy('valid');

    expect(screen.queryByText('User Name is required')).toBeNull();

    // Clear user name.
    fireEvent.input(userNameControl, {
      target: {
        value: '',
      },
    });

    expect(componentInstance.viewForm.valid).toBeFalsy('valid');
    expect(screen.queryByText('User Name is required')).not.toBeNull();

    // suppress 'has no expectations' warnings.
    expect().nothing();
  });
});

describe(SignInFormComponent.name, () => {
  it('shows error message', async () => {
    const errorMessage = 'abcdefghi';
    const { component } = await setup({ errorMessage });

    component.getByText(errorMessage);

    // suppress 'has no expectations' warnings.
    expect().nothing();
  });

  it('is disabled when pending', async () => {
    const {
      passwordControl,
      signInButtonControl,
      signUpButtonControl,
      userNameControl,
    } = await setup({ pending: true });

    // screen.debug(signInButtonControl);
    expect(userNameControl.getAttribute('disabled')).toBe('', 'username');
    expect(passwordControl.getAttribute('disabled')).toBe('', 'password');
    expect(signInButtonControl.getAttribute('disabled')).toBe(
      'true',
      'signInButton'
    );
    expect(signUpButtonControl.getAttribute('disabled')).toBe(
      'true',
      'signUpButton'
    );

    // suppress 'has no expectations' warnings.
    expect().nothing();
  });

  it('should display error messages and submit if valid', async () => {
    const {
      component,
      passwordControl,
      signInButtonControl,
      signUpButtonControl,
      userNameControl,
      signUpClickedSpy,
      submittedSpy,
    } = await setup({});

    expect(signInButtonControl.getAttribute('disabled')).toBe(
      'true',
      'signInButton'
    );
    expect(signUpButtonControl.getAttribute('disabled')).toBeNull(
      'signUpButton'
    );

    // touch control to show validation error.
    fireEvent.blur(userNameControl);

    expect(screen.queryByText('User Name is required')).not.toBeNull();

    // touch control to show validation error.
    fireEvent.blur(passwordControl);

    expect(screen.queryByText('Password is required')).not.toBeNull();

    fireEvent.input(userNameControl, {
      target: {
        value: 'dfdf',
      },
    });

    expect(screen.queryByText('User Name is required')).toBeNull();

    fireEvent.input(passwordControl, {
      target: {
        value: 'PASSWORD',
      },
    });

    expect(screen.queryByText('Password is required')).toBeNull();

    // Form valid.
    expect(signInButtonControl.getAttribute('disabled')).toBeNull(
      'signInButton'
    );
    expect(signUpButtonControl.getAttribute('disabled')).toBeNull(
      'signUpButton'
    );

    // Clear user name.
    fireEvent.input(userNameControl, {
      target: {
        value: '',
      },
    });

    expect(screen.queryByText('User Name is required')).not.toBeNull();

    // Clear password
    fireEvent.input(passwordControl, {
      target: {
        value: '',
      },
    });

    expect(screen.queryByText('Password is required')).not.toBeNull();

    // Enter username and password
    const inputValues = {
      username: 'fred',
      password: 'apassword',
    };

    fireEvent.input(userNameControl, {
      target: {
        value: inputValues.username,
      },
    });

    fireEvent.input(passwordControl, {
      target: {
        value: inputValues.password,
      },
    });

    // check submit
    fireEvent.click(signInButtonControl);
    expect(submittedSpy).toHaveBeenCalledTimes(1);
    expect(submittedSpy).toHaveBeenCalledWith({
      ...inputValues,
    });

    fireEvent.click(signUpButtonControl);
    expect(signUpClickedSpy).toHaveBeenCalledTimes(1);
  });
});
