import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {API_server_url, httpOptions} from "../../environments/environment";
import {GenerateURLtokenService} from "./generate-urltoken.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private http: HttpClient) {  }


  register(credentials: {email, iin, tel, password}): Observable<any> {
    const urlstring = API_server_url + 'users/insert.php?key=' +  GenerateURLtokenService.getKey();
    return this.http.post(urlstring, new URLSearchParams(credentials), httpOptions);
  }
}
