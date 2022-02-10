import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignInFormComponentModule } from '../../components/sign-in-form';

import { SignInPageComponentStoreRoutingModule } from './sign-in-page-component-store-routing.module';
import { SignInPageComponentStoreComponent } from './sign-in-page-component-store.component';

@NgModule({
  imports: [
    CommonModule,
    SignInFormComponentModule,
    SignInPageComponentStoreRoutingModule,
  ],
  declarations: [SignInPageComponentStoreComponent],
  // exports: [SignInPageComponent],
})
export class SignInPageComponentStoreComponentModule {}
