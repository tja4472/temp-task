import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from '@app/core/components';
import { AppComponent, NotFoundPageComponent } from '@app/core/containers';
import { MaterialModule } from '@app/material';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  SidenavComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
