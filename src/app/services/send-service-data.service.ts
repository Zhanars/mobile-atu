import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {API_server_url, httpOptions} from "../../environments/environment";
import {GenerateURLtokenService} from "./generate-urltoken.service";
import {HttpClient} from "@angular/common/http";
import {Strings} from "../classes/strings";



@Injectable({
  providedIn: 'root'
})
export class SendServiceDataService {
  constructor(private http: HttpClient) { }

  sendPost(send_data: any, form_id: string): Observable<any> {
    const urlstring = API_server_url + 'services/forms/insert.php?key=' +  GenerateURLtokenService.getKey() + '&form_id=' + form_id + '&lang=' + Strings.user_lang;
    console.log(urlstring);
    return this.http.post(urlstring, new URLSearchParams(send_data), httpOptions);
  }
  getFormElements(form_id: string): Observable<any>{
    const urlstring = API_server_url + 'services/forms/?key=' + GenerateURLtokenService.getKey() + "&form_id=" + form_id + '&lang=' + Strings.user_lang;
    console.log(urlstring);
    return this.http.get(urlstring);
  }
  getNotification(): Observable<any>{
    const urlstring = API_server_url + 'notification/?key=' + GenerateURLtokenService.getKey() +'&user_id='+Strings.user_id + '&lang=' + Strings.user_lang;
    console.log(urlstring);
    return this.http.get<any[]>(urlstring);
  }
  getServices(): Observable<any>{
    const urlstring = API_server_url + 'services/get/?key=' + GenerateURLtokenService.getKey() + '&lang=' + Strings.user_lang;
    console.log(urlstring);
    return this.http.get(urlstring)
  }
  getUMKD(): Observable<any>{
    const urlstring = API_server_url + 'document/umkd/?key=' + GenerateURLtokenService.getKey() + "&iin=" + Strings.iin + '&lang=' + Strings.user_lang;
    console.log(urlstring);
    return this.http.get(urlstring)
  }
  getNotificationForId(id): Observable<any>{
    const urlstring = API_server_url + 'notification/details/?key=' + GenerateURLtokenService.getKey() + '&notification_id=' + id + '&lang=' + Strings.user_lang;
    console.log(urlstring);
    return this.http.get<any[]>(urlstring);
  }
  setNotificationStatusRead(id: string): Observable<any>{
    const urlstring = API_server_url + 'notification/update.php/?key=' + GenerateURLtokenService.getKey() + '&lang=' + Strings.user_lang;
    console.log(urlstring);
    return this.http.post(urlstring, new URLSearchParams({'notification_id':  id, 'read': "true"}), httpOptions);
  }

  sendFile(formData: any, form_id: string) {
    const urlstring = API_server_url + 'services/forms/insert.php?key=' +  GenerateURLtokenService.getKey() + '&form_id=' + form_id + '&lang=' + Strings.user_lang;
    console.log(urlstring);
    return this.http.post(urlstring, formData);
  }

  loadStrings(lang:string){
    let url = API_server_url + 'strings/get/?key=' + GenerateURLtokenService.getKey() + "&lang=" + lang;
    console.log(url);
    return this.http.get(url);
  }

  setLang(lang: string) {
    let url = API_server_url + 'users/update.php?key=' + GenerateURLtokenService.getKey() + "&lang=" + lang + "&user_id=" + Strings.user_id;
    console.log(url);
    this.http.get(url).subscribe();
  }

}
