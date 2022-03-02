import { ApplicationRef } from '@angular/core';

import { AuthService } from '@app/auth/services/auth.service';

declare global {
  interface Window {
    Cypress?: unknown;
    appRef?: ApplicationRef;
    AuthService?: AuthService;
  }
}
