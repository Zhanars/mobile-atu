import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoadingController, PopoverController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from "@capacitor/storage";
import {API_server_url, AUTH_TOKEN_KEY, httpOptions} from "../../../environments/environment";
import {Md5} from "ts-md5";
import {Strings} from "../../classes/strings";
import {GenerateURLtokenService} from "../../services/generate-urltoken.service";
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  strings = Strings;
  emails = [];
  constructor(private http: HttpClient, private popoverCtrl: PopoverController, private router: Router) {
    console.log(Strings);
  }

  async ngOnInit() {
    const urlstring = API_server_url + 'notification/?key=' + GenerateURLtokenService.getKey() +'&user_id='+Strings.user_id;
    console.log(urlstring);

    this.http.get<any[]>(urlstring).subscribe(res => {
      this.emails = res;
      for (let e of this.emails) {
        // Create a custom color for every email
        console.log('sad');
        e.color = this.intToRGB(this.hashCode(e.title));
      }
    });
  }

  openDetails(id,read) {
    this.router.navigate([ 'tabs/notification/details', id]);
    if(!read)
    this.setReadedStatus(id);
  }

  // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  private hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  private intToRGB(i) {
    const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return '#' + '00000'.substring(0, 6 - c.length) + c;
  }

  private setReadedStatus(id) {
    const urlstring = API_server_url + 'notification/update.php/?key=' + GenerateURLtokenService.getKey();
    console.log(urlstring);
    this.http.post(urlstring, new URLSearchParams({'notification_id':  id, 'read': "true"}), httpOptions).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  doRefresh(ev) {
    this.ngOnInit();
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }
}
