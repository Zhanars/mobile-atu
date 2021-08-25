import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import {BehaviorSubject, from, Observable, pipe, Subject} from 'rxjs';
import {Md5} from 'ts-md5/dist/md5';
import { Storage } from '@capacitor/storage';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userName: string = "";
  iin: string = "";

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor( private http: HttpClient) {
    this.loadToken();
  }

  async  loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: {email, password}) {
    const md5 = new Md5();
    let quest = 'https://socket.atu.kz/api/users/login/?email=' + credentials.email + '&password=' + md5.appendStr(credentials.password).end();
    console.log(quest);
    return this.http.get(quest);
  }
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
