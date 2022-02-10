import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInPageComponentStoreComponent } from './sign-in-page-component-store.component';

const routes: Routes = [
  { path: '', component: SignInPageComponentStoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInPageComponentStoreRoutingModule {}
