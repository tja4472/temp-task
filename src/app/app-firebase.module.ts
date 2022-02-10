import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire/compat';
/*
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/compat/analytics';
*/
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFirePerformanceModule } from '@angular/fire/compat/performance';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    // AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirePerformanceModule,
  ],
  // exports: [AngularFireModule, AngularFireAuthModule],
  // providers: [ScreenTrackingService, UserTrackingService],
})
export class AppFirebaseModule {}
