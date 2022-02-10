import * as AuthApiActions from '@app/auth/actions/auth-api.actions';
import * as AuthGuardServiceActions from '@app/auth/actions/auth-guard-service.actions';
import * as AuthActions from '@app/auth/actions/auth.actions';
import * as SignInPageActions from '@app/auth/actions/sign-in-page.actions';
import * as SignUpPageActions from '@app/auth/actions/sign-up-page.actions';

// Error while using typescript 3.8 export aliases
// https://github.com/angular/angular-cli/issues/17231
// export * as SignInPageActions from '@app/auth/actions/sign-in-page.actions';

export {
  AuthActions,
  AuthApiActions,
  AuthGuardServiceActions,
  SignInPageActions,
  SignUpPageActions,
};
