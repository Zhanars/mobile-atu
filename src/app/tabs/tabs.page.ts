import { Component, OnInit } from '@angular/core';

import {Plugins} from "@capacitor/core";
import { IonRouterOutlet, Platform } from '@ionic/angular';
import {TabsPageModule} from "./tabs.module";
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
              public tubsPage: TabsPageModule) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
    this.tubsPage.subject.asObservable().subscribe(s=>{
      this.countNotifications = s;
      console.log(this.countNotifications);
    });
  }
   ngOnInit() {
  }
}
