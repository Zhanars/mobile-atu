import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Storage } from '@capacitor/storage';
import {API_server_url, httpOptions, AUTH_TOKEN_KEY} from "../../environments/environment";
import {GenerateURLtokenService} from "./generate-urltoken.service";
import {Strings} from "../classes/strings";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token: any;

  constructor( private http: HttpClient) {
    this.loadToken();
  }

  async  loadToken() {
    const token = await Storage.get({ key: AUTH_TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = JSON.parse(token.value);
      Strings.setUser(this.token);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials:  {email, password,token_firebase}): Observable<Object> {
    const urlstring = API_server_url + 'users/?key=' + GenerateURLtokenService.getKey();
    return this.http.post(urlstring, new URLSearchParams(credentials), httpOptions);

  }
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    Strings.deleteUser();
    return Storage.remove({key: AUTH_TOKEN_KEY});
  }
}
