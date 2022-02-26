import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { SignUpPageActions } from '@app/auth/actions';
import { Credentials } from '@app/auth/models/credentials.model';
import { AuthRootState } from '@app/auth/reducers';
import { SignUpPageSelectors } from '@app/auth/selectors';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPageComponent implements OnInit {
  error$: Observable<string | null>;
  pending$: Observable<boolean>;

  constructor(private store: Store<AuthRootState>) {
    this.error$ = store.pipe(select(SignUpPageSelectors.selectSignUpPageError));
    this.pending$ = store.pipe(
      select(SignUpPageSelectors.selectSignUpPagePending)
    );

    this.store.dispatch(SignUpPageActions.entered());
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  onSubmitted(credentials: Credentials) {
    this.store.dispatch(SignUpPageActions.signUp({ credentials }));
  }
}
