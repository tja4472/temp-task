import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { SignInPageActions } from '@app/auth/actions';
import { Credentials } from '@app/auth/models/credentials.model';
import { AuthRootState } from '@app/auth/reducers';
import { SignInPageSelectors } from '@app/auth/selectors';

import { SignInPageComponentStore } from './sign-in-page-component-store.store';

@Component({
  selector: 'app-sign-in-page-component-store',
  templateUrl: './sign-in-page-component-store.component.html',
  styleUrls: ['./sign-in-page-component-store.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SignInPageComponentStore],
})
export class SignInPageComponentStoreComponent implements OnInit {
  // error$: Observable<string | null>;
  // pending$: Observable<boolean>;

  // ViewModel for the Component
  readonly vm$ = this.signInPageComponentStore.vm$;

  constructor(
    private store: Store<AuthRootState>,
    private readonly signInPageComponentStore: SignInPageComponentStore
  ) {
    // this.error$ = store.pipe(select(SignInPageSelectors.selectSignInPageError));
    // this.pending$ = store.pipe(
    //  select(SignInPageSelectors.selectSignInPagePending)
    // );
    // this.store.dispatch(SignInPageActions.entered());
  }

  ngOnInit() {}

  onSubmitted(credentials: Credentials) {
    // this.store.dispatch(SignInPageActions.signIn({ credentials }));
    console.log('onSubmitted>', credentials);
    // Will do auth check here.
    // this.signInPageComponentStore.effect1('test text');
    // this.signInPageComponentStore.effect2(credentials);
    // this.signInPageComponentStore.effect3(credentials);
    // this.signInPageComponentStore.effect4(credentials);
  }

  onSignUp() {
    this.store.dispatch(SignInPageActions.showSignUpPage());
  }
}
