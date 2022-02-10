import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignUpFormComponentModule } from '../../components/sign-up-form';

import { SignUpPageRoutingModule } from './sign-up-page-routing.module';
import { SignUpPageComponent } from './sign-up-page.component';

@NgModule({
  imports: [CommonModule, SignUpFormComponentModule, SignUpPageRoutingModule],
  declarations: [SignUpPageComponent],
})
export class SignUpPageComponentModule {}
