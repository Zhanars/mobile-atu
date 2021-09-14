import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Md5} from 'ts-md5/dist/md5';
import { Storage } from '@capacitor/storage';
import {API_server_url, httpOptions, AUTH_TOKEN_KEY, User} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{


  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token: User;
  login_result: string;

  constructor( private http: HttpClient) {
    this.loadToken();
  }

  async  loadToken() {
    const token = await Storage.get({ key: AUTH_TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = JSON.parse(token.value);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials:  {email, password,token_firebase}): Observable<Object> {
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getUTCFullYear() + "-" + (fdate.getUTCMonth() + 1) + "-" + fdate.getUTCDate()).toString();
    const urlstring = API_server_url + 'users/?key=' + md5.appendStr(realDate).end();
    return this.http.post(urlstring, new URLSearchParams(credentials), httpOptions);

  }
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: AUTH_TOKEN_KEY});
  }
}
