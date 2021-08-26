import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import {BehaviorSubject, from, Observable, pipe, Subject} from 'rxjs';
import {Md5} from 'ts-md5/dist/md5';
import { Storage } from '@capacitor/storage';
import {AlertController} from "@ionic/angular";

const TOKEN_KEY = 'USER';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


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
    const fdate = new Date();
    const realDate = (fdate.getFullYear() + "-" + (fdate.getMonth() + 1) + "-" + fdate.getDate()).toString();
    const urlstring = `https://socket.atu.kz/api/users/select.php/?key=` + md5.appendStr(realDate).end() + '&email=' + credentials.email + '&password=' + md5.appendStr(credentials.password).end();
    console.log(urlstring);
    return this.http.post(urlstring, '');
  }
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
