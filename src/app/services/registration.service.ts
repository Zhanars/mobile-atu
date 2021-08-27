import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {Storage} from "@capacitor/storage";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';
import {API_server_url, httpOptions} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private http: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }


  register(credentials: {email, iin, tel, password}): Observable<any> {
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getFullYear() + "-" + (fdate.getMonth() + 1) + "-" + fdate.getDate()).toString();
    const urlstring = API_server_url + 'users/insert.php/?key=' + md5.appendStr(realDate).end();
    return this.http.post(urlstring, new URLSearchParams(credentials), httpOptions);
  }
}
