import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import {NavigationEnd, Router} from "@angular/router";
import {Storage} from "@capacitor/storage";
import {API_server_url, AUTH_TOKEN_KEY} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GenerateURLtokenService} from "../services/generate-urltoken.service";
import {Subject} from "rxjs";
import {Strings} from "../classes/strings";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {
  subject = new Subject<string>();
  constructor(public router: Router,public http: HttpClient,
              public generateURLtokenService: GenerateURLtokenService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlstring = API_server_url + 'notification/tabs/?key=' + this.generateURLtokenService.getKey() + '&user_id=' + Strings.user_id;
        this.http.get(urlstring).subscribe(res => {
          this.subject.next(res[0].count_notification);
        });
      }
    });
  }



}
