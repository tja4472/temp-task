import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public settings = environment;

  public get aaa() {
    return environment;
  }

  public get appCode() {
    return environment.appCode;
  }

  public method1() {
    return this.appCode;
  }
}
