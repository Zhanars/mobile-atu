import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {Storage} from "@capacitor/storage";
import { HttpClient } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  md5 = new Md5();
  fdate = new Date();
  constructor(private http: HttpClient) {  }


  register(credentials: {email, iin, telephone, password}): Observable<any> {
    let result;
    const realDate = this.fdate.getFullYear() + "-" + (this.fdate.getMonth() + 1) + "-" + this.fdate.getDate() + " " + (this.fdate.getHours() - 6);
    const urlstring = `http://socket.atu.kz/api/users/insert.php/?key=` + this.md5.appendStr(realDate.toString()).end();
    result = this.http.post(urlstring, credentials);
    console.log(urlstring + "  -->" + realDate);
    console.log("Данные: " + credentials.email + "-" + credentials.iin + "-" + credentials.password + "-" + credentials.telephone);
    return result;
  }
}
