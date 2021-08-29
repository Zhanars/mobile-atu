import { Component, OnInit } from '@angular/core';

import {Plugins} from "@capacitor/core";
import { IonRouterOutlet, Platform } from '@ionic/angular';
const { App } = Plugins;
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private platform: Platform,
              private routerOutlet: IonRouterOutlet) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ngOnInit() {
  }

}
