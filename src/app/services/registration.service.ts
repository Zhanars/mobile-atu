import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {Storage} from "@capacitor/storage";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }


  register(credentials: {email, iin, telephone, password}): Observable<any> {
    let result;
    result = this.http.post(`https://reqres.in/api/login`, credentials);
    console.log(result);
    return result;
  }
}
