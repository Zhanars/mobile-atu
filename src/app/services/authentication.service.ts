import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Md5} from 'ts-md5/dist/md5';
import { Storage } from '@capacitor/storage';
import {API_server_url, httpOptions} from "../../environments/environment";

const TOKEN_KEY = 'USER';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{


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

  login(credentials:  {email, password}) {
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getFullYear() + "-" + (fdate.getMonth() + 1) + "-" + fdate.getDate()).toString();
    const urlstring = API_server_url + 'users/select.php/?key=' + md5.appendStr(realDate).end();
    return this.http.post(urlstring, new URLSearchParams(credentials), httpOptions);
  }
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
