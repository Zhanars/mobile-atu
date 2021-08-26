import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {Storage} from "@capacitor/storage";
import { HttpClient } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private http: HttpClient) {  }


  register(credentials: {email, iin, tel, password}): Observable<any> {
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getFullYear() + "-" + (fdate.getMonth() + 1) + "-" + fdate.getDate()).toString();
    const urlstring = `http://socket.atu.kz/api/users/insert.php/?key=` + md5.appendStr(realDate).end() + '&email=' + credentials.email + '&iin=' + credentials.iin + '&telephone=' + credentials.tel + '&password=' + md5.appendStr(credentials.password).end();
    console.log(urlstring);
    return this.http.post(urlstring, '');
  }
}
