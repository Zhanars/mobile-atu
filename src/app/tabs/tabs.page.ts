import { Component, OnInit } from '@angular/core';

import {Plugins} from "@capacitor/core";
import { IonRouterOutlet, Platform } from '@ionic/angular';
import {Storage} from "@capacitor/storage";
import {API_server_url, AUTH_TOKEN_KEY} from "../../environments/environment";
import {Md5} from "ts-md5";
import {HttpClient} from "@angular/common/http";
const { App } = Plugins;
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  countNotification = 0;
  md5 = new Md5();
  fdate = new Date();
  realDate = (this.fdate.getUTCFullYear() + "-" + (this.fdate.getUTCMonth() + 1) + "-" + this.fdate.getUTCDate()).toString();
  key = this.md5.appendStr(this.realDate).end();
  constructor(private platform: Platform,
              private routerOutlet: IonRouterOutlet,
              private http: HttpClient) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  async ngOnInit() {
    const token = await Storage.get({key: AUTH_TOKEN_KEY});
    const val = JSON.parse(token.value);
    const userid = val.user_id;
    const urlstring = API_server_url + 'notification/tabs/?key=' + this.key + '&user_id=' + userid;
    this.http.get<any[]>(urlstring).subscribe(res => {
      this.countNotification = res[0].count_notification;
    });
  }


}
