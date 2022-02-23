import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { HomePageActions } from '../actions';

@Component({
  selector: 'app-home-page',
  template: `
    Home Page
    <button data-test="sign-out-button" (click)="viewSignOutClicked()">
      Sign Out
    </button>
  `,
  styles: [],
})
export class HomePageComponent {
  constructor(private store: Store<{}>) {}

  viewSignOutClicked() {
    this.store.dispatch(HomePageActions.signOut());
  }
}
