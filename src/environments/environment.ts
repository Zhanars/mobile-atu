// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: false
};
export const API_server_url = 'https://socket.atu.kz/api/';
//export const HOME_page_url = 'https://atu.edu.kz/archives/category/news-ru/';
export const HOME_page_url = '';
export const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};
export class User{
  constructor( public username:string, public iin:string, public email:string, public phone:string, public user_id:bigint, public sex: bigint) {
  }
}
export const AUTH_TOKEN_KEY = 'USER';
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
