import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignInFormComponentModule } from '../../components/sign-in-form';

import { SignInPageRoutingModule } from './sign-in-page-routing.module';
import { SignInPageComponent } from './sign-in-page.component';

@NgModule({
  imports: [CommonModule, SignInFormComponentModule, SignInPageRoutingModule],
  declarations: [SignInPageComponent],
  // exports: [SignInPageComponent],
})
export class SignInPageComponentModule {}
