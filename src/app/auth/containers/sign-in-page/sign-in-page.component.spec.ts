import { TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { take } from 'rxjs/operators';

import { SignInPageActions } from '@app/auth/actions';

import {
  SignInFormComponent,
  SignInFormComponentModule,
} from '../../components/sign-in-form';
import { SignInPageSelectors } from '../../selectors';

import { SignInPageComponent } from './sign-in-page.component';
import { SignInPageComponentModule } from './sign-in-page.module';

import { fireEvent, render, screen } from '@testing-library/angular';

async function setup({
  errorMessage = null,
  pending = false,
}: {
  errorMessage?: null | string;
  pending?: boolean;
}) {
  const component = await render(SignInPageComponent, {
    imports: [SignInPageComponentModule],
    declarations: [SignInFormComponent],
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: SignInPageSelectors.selectSignInPageError,
            value: errorMessage,
          },
          {
            selector: SignInPageSelectors.selectSignInPagePending,
            value: pending,
          },
        ],
      }),
    ],
  });

  const userNameControl = screen.getByTestId('username');
  const passwordControl = screen.getByTestId('password');
  const signInButtonControl = screen.getByRole('button', {
    name: /sign in/i,
  });
  const signUpButtonControl = screen.getByRole('button', {
    name: /sign up/i,
  });

  const mockStore = TestBed.inject(MockStore);
  const mockStoreDispatchSpy = spyOn(mockStore, 'dispatch');

  return {
    component,
    userNameControl,
    passwordControl,
    mockStore,
    mockStoreDispatchSpy,
    signInButtonControl,
    signUpButtonControl,
  };
}

// need ngrx mock store and selectors
describe(SignInPageComponent.name, () => {
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

  it('dispatches actions', async () => {
    const {
      component,
      mockStore,
      mockStoreDispatchSpy,
      passwordControl,
      userNameControl,
      signInButtonControl,
      signUpButtonControl,
    } = await setup({});

    // The following doesn't work for dispatches from constructor or ngOnInit
    // expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(1);
    // https://github.com/testing-library/angular-testing-library/issues/102#issuecomment-637354131
    mockStore.scannedActions$
      .pipe(take(1))
      .subscribe((scannedAction) =>
        expect(scannedAction).toEqual(SignInPageActions.entered())
      );

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

    const signInAction = SignInPageActions.signIn({
      credentials: {
        username: inputValues.username,
        password: inputValues.password,
      },
    });
    fireEvent.click(signInButtonControl);
    expect(mockStoreDispatchSpy).toHaveBeenCalledWith(signInAction);

    const showSignUpPageAction = SignInPageActions.showSignUpPage();
    fireEvent.click(signUpButtonControl);
    expect(mockStoreDispatchSpy).toHaveBeenCalledWith(showSignUpPageAction);
  });
});
