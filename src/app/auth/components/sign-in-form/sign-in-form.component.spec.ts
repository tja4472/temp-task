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
  submittedSpy = jest.fn(),
  signUpClickedSpy = jest.fn(),
}: {
  errorMessage?: null | string;
  pending?: boolean;
  submittedSpy?: jest.Mock<any, any>;
  signUpClickedSpy?: jest.Mock<any, any>;
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

    expect(componentInstance.viewForm.dirty).toBeFalsy();
    expect(componentInstance.viewForm.pristine).toBeTruthy();
    expect(componentInstance.viewForm.touched).toBeFalsy();
    expect(componentInstance.viewForm.valid).toBeFalsy();

    // touch control to show validation error.
    fireEvent.blur(userNameControl);

    expect(componentInstance.viewForm.dirty).toBeFalsy();
    expect(componentInstance.viewForm.pristine).toBeTruthy();
    expect(componentInstance.viewForm.touched).toBeTruthy();
    expect(componentInstance.viewForm.valid).toBeFalsy();

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
    expect(componentInstance.viewForm.dirty).toBeTruthy();
    expect(componentInstance.viewForm.pristine).toBeFalsy();
    expect(componentInstance.viewForm.touched).toBeTruthy();
    expect(componentInstance.viewForm.valid).toBeFalsy();

    expect(screen.queryByText('User Name is required')).toBeNull();

    // Clear user name.
    fireEvent.input(userNameControl, {
      target: {
        value: '',
      },
    });

    expect(componentInstance.viewForm.valid).toBeFalsy();
    expect(screen.queryByText('User Name is required')).not.toBeNull();

    // suppress 'has no expectations' warnings.
    // expect().nothing();
  });
});

describe('SignInFormComponent', () => {
  it('shows error message', async () => {
    const errorMessage = 'abcdefghi';
    const { component } = await setup({ errorMessage });

    component.getByText(errorMessage);

    // suppress 'has no expectations' warnings.
    // expect().nothing();
  });

  it('is disabled when pending', async () => {
    const {
      passwordControl,
      signInButtonControl,
      signUpButtonControl,
      userNameControl,
    } = await setup({ pending: true });

    // screen.debug(signInButtonControl);
    expect(userNameControl.getAttribute('disabled')).toBe('');
    expect(passwordControl.getAttribute('disabled')).toBe('');
    expect(signInButtonControl.getAttribute('disabled')).toBe('true');
    expect(signUpButtonControl.getAttribute('disabled')).toBe('true');

    // suppress 'has no expectations' warnings.
    // expect().nothing();
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

    expect(signInButtonControl.getAttribute('disabled')).toBe('true');
    expect(signUpButtonControl.getAttribute('disabled')).toBeNull();

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
    expect(signInButtonControl.getAttribute('disabled')).toBeNull();
    expect(signUpButtonControl.getAttribute('disabled')).toBeNull();

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
