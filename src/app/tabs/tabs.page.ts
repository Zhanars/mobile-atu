import {Component, NgZone, OnInit} from '@angular/core';

import {Plugins} from "@capacitor/core";
import { IonRouterOutlet, Platform } from '@ionic/angular';
import {TabsPageModule} from "./tabs.module";
import {Strings} from "../classes/strings";
import {ConfigStrings} from "../interfaces/config-strings";
import {SendServiceDataService} from "../services/send-service-data.service";
const { App } = Plugins;
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage implements OnInit {
countNotifications='0';
  constructor(private platform: Platform,
              private routerOutlet: IonRouterOutlet,
              private sendServiceDataService:SendServiceDataService,
              private ngZone:NgZone,
              public tubsPage: TabsPageModule) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
    this.ngZone.run(() => {this.tubsPage.subject.asObservable().subscribe(s=>{   this.countNotifications = s;    });  });
  }
   ngOnInit() {
     this.loadStr();
  }

  loadStr() {
    this.ngZone.run(() => {this.sendServiceDataService.loadStrings(Strings.user_lang).subscribe(      (x: ConfigStrings) => {        Strings.setString(x);      }); });

  }
}
