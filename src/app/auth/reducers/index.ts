import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { RootState } from '@app/root-store/reducers';

import { authReducer, authReducerKey, AuthState } from './auth.reducer';
import {
  signInPageReducer,
  signInPageReducerKey,
  SignInPageState,
} from './sign-in-page.reducer';
import {
  signUpPageReducer,
  signUpPageReducerKey,
  SignUpPageState,
} from './sign-up-page.reducer';

export const authFeatureKey = 'authFeature';

export interface AuthFeatureState {
  [authReducerKey]: AuthState;
  [signInPageReducerKey]: SignInPageState;
  [signUpPageReducerKey]: SignUpPageState;
}

export interface AuthRootState extends RootState {
  [authFeatureKey]: AuthFeatureState;
}

export const authReducers: ActionReducerMap<AuthFeatureState> = {
  [authReducerKey]: authReducer,
  [signInPageReducerKey]: signInPageReducer,
  [signUpPageReducerKey]: signUpPageReducer,
};

export const selectAuthFeatureState = createFeatureSelector<AuthFeatureState>(
  authFeatureKey
);
