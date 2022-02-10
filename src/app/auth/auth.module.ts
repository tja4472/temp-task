import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { AuthEffects } from '@app/auth/effects/auth.effects';
import { authFeatureKey, authReducers } from '@app/auth/reducers';
import { MaterialModule } from '@app/material';

import { SignoutConfirmationDialogComponent } from './components/signout-confirmation-dialog/signout-confirmation-dialog.component';

export const COMPONENTS = [SignoutConfirmationDialogComponent];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature(authFeatureKey, authReducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
})
export class AuthModule {}
