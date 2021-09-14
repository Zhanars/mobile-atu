import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {API_server_url, httpOptions} from "../../environments/environment";
import {GenerateURLtokenService} from "./generate-urltoken.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SendServiceDataService {

  constructor(private http: HttpClient) { }

  sendPost(send_data: any, form_id: string): Observable<any> {
    const urlstring = API_server_url + 'services/forms/insert.php?key=' +  GenerateURLtokenService.getKey() + '&form_id=' + form_id;
    return this.http.post(urlstring, new URLSearchParams(send_data), httpOptions);
  }
  getFormElements(form_id: string): Observable<any>{
    const urlstring = API_server_url + 'services/forms/?key=' + GenerateURLtokenService.getKey() + "&form_id=" + form_id;
    console.log(urlstring);
    return this.http.get(urlstring);
  }

  sendFile(formData: any, form_id: string) {
    const urlstring = API_server_url + 'services/forms/insert.php?key=' +  GenerateURLtokenService.getKey() + '&form_id=' + form_id;
    return this.http.post(urlstring, formData);
  }
  testSend(){
    const urlstring = 'https://3b32-37-228-66-82.ngrok.io/token/?key=' + GenerateURLtokenService.getKey();

    this.http.post(urlstring, new URLSearchParams({'token': 'dsadsadsadsadsad'}), httpOptions).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
