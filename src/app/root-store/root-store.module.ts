import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { metaReducers, rootReducers } from '@app/root-store/reducers';
import { TasksStoreModule } from '@app/root-store/tasks-store';

import { UserStoreModule } from './user-store';

@NgModule({
  imports: [
    CommonModule,
    TasksStoreModule,
    UserStoreModule,
    StoreModule.forRoot(rootReducers, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Ng Task App',
      maxAge: 25, // Retains last 25 states
    }),
  ],
  declarations: [],
})
export class RootStoreModule {}
