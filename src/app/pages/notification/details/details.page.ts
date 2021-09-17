import { Component, OnInit } from '@angular/core';
import {Storage} from "@capacitor/storage";
import {API_server_url, AUTH_TOKEN_KEY} from "../../../../environments/environment";
import {Md5} from "ts-md5";
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  notificationId: number;
  notifications = [];
  title = '';
  constructor(private route: ActivatedRoute,private http: HttpClient) { const routeParams = this.route.snapshot.paramMap;
    this.notificationId = Number(routeParams.get('productId'));}

  async ngOnInit() {
    const token = await Storage.get({key: AUTH_TOKEN_KEY});
    const val = JSON.parse(token.value);
    const userid = val.user_id;
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getUTCFullYear() + "-" + (fdate.getUTCMonth() + 1) + "-" + fdate.getUTCDate()).toString();
    const urlstring = API_server_url + 'notification/details/?key=' + md5.appendStr(realDate).end() + '&notification_id=' + this.notificationId;

    this.http.get<any[]>(urlstring).subscribe(res => {
      this.notifications = res;
      for (let e of this.notifications) {
        // Create a custom color for every email
        console.log('sad');
        this.title = e.title;
      }
    });
  }


}
