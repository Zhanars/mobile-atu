import { Component, OnInit } from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {Router} from "@angular/router";
import {Storage} from "@capacitor/storage";
import {API_server_url, AUTH_TOKEN_KEY} from "../../../environments/environment";
import {Md5} from "ts-md5";
import {HttpClient} from "@angular/common/http";
import {Service} from "./service";

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {

  public items: Service[] = [];

  constructor(private router: Router,
              private readonly loadingCtrl: LoadingController,
              private readonly http: HttpClient) {
    this.loadData();
  }

  ngOnInit() {
  }


  public searchService() {
    const items = Array.from(document.querySelector('ion-list').children);
    const query = document.querySelector('ion-searchbar').value.toLowerCase();
    requestAnimationFrame(() => {
      items.forEach((item, key) => {
        const he = 'hide-element';
        item.className = item.className.replace(he, '');
        if (item.textContent.toLowerCase().indexOf(query) < 0){
          item.className = item.className + ' hide-element';
        }
      });
    });
  }
  public async loadData() {
    let loadingPopup = await this.loadingCtrl.create({
      message: ""
    });
    loadingPopup.present();
    const token = await Storage.get({key: AUTH_TOKEN_KEY});
    const val = JSON.parse(token.value);
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getUTCFullYear() + "-" + (fdate.getUTCMonth() + 1) + "-" + fdate.getUTCDate()).toString();
    const urlstring = API_server_url + 'services/get/?key=' + md5.appendStr(realDate).end();
    this.http.get(urlstring).subscribe(
      (data:any)=> {
        this.items = data;
      },
    );
    loadingPopup.dismiss();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 2000);
  }
}
