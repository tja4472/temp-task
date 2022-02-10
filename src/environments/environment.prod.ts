import { firebaseProdConfig } from '@app/firebase/firebase-config';

export const environment = {
  appCode: 'ngrx-auth-module',
  production: true,
  firebase: firebaseProdConfig,
};
