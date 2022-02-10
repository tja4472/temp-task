import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { SignInPageActions } from '@app/auth/actions';
import { Credentials } from '@app/auth/models/credentials.model';
import { AuthRootState } from '@app/auth/reducers';
import { SignInPageSelectors } from '@app/auth/selectors';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent implements OnInit {
  error$: Observable<string | null>;
  pending$: Observable<boolean>;

  constructor(private store: Store<AuthRootState>) {
    this.error$ = store.pipe(select(SignInPageSelectors.selectSignInPageError));
    this.pending$ = store.pipe(
      select(SignInPageSelectors.selectSignInPagePending)
    );

    this.store.dispatch(SignInPageActions.entered());
  }

  ngOnInit() {}

  onSubmitted(credentials: Credentials) {
    this.store.dispatch(SignInPageActions.signIn({ credentials }));
  }

  onSignUp() {
    this.store.dispatch(SignInPageActions.showSignUpPage());
  }
}
