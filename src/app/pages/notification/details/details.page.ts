import { Component, OnInit } from '@angular/core';
import {Storage} from "@capacitor/storage";
import {API_server_url, AUTH_TOKEN_KEY} from "../../../../environments/environment";
import {Md5} from "ts-md5";
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {Strings} from "../../../classes/strings";
import {GenerateURLtokenService} from "../../../services/generate-urltoken.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  strings = Strings;
  notificationId: number;
  notifications = [];
  title = '';
  constructor(private route: ActivatedRoute,private http: HttpClient) { const routeParams = this.route.snapshot.paramMap;
    this.notificationId = Number(routeParams.get('productId'));}

  async ngOnInit() {
    const urlstring = API_server_url + 'notification/details/?key=' + GenerateURLtokenService.getKey() + '&notification_id=' + this.notificationId;

    this.http.get<any[]>(urlstring).subscribe(res => {
      this.notifications = res;
      for (let e of this.notifications) {
        console.log('sad');
        this.title = e.title;
      }
    });
  }


}
