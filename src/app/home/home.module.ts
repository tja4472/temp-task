import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '@app/material';

import { HomePageComponent } from './containers';
import { HomeEffects } from './effects/home.effects';
import { HomeRoutingModule } from './home-routing.module';
import * as fromHome from './reducers/home.reducer';

export const COMPONENTS = [HomePageComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HomeRoutingModule,
    StoreModule.forFeature(fromHome.homeFeatureKey, fromHome.reducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
})
export class HomeModule {}
