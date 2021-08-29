import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController, NavParams} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {map, timeout} from "rxjs/operators";
import {API_server_url, AUTH_TOKEN_KEY, httpOptions} from "../../../../environments/environment";
import {Md5} from "ts-md5";
import {Storage} from "@capacitor/storage";
import {async} from "rxjs";
import {Subject} from "./subject";

@Component({
  selector: 'app-umkd',
  templateUrl: './umkd.page.html',
  styleUrls: ['./umkd.page.scss'],
})
export class UmkdPage{

  public items: Subject[] = [];
  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    this.loadData();
  }
  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        // eslint-disable-next-line eqeqeq
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  async loadData() {
      // Первоначальные значения переменных
      let loadingPopup = await this.loadingCtrl.create({
        message: ""
      });
      loadingPopup.present();
      const token = await Storage.get({key: AUTH_TOKEN_KEY});
      const val = JSON.parse(token.value);
      const iin = val.iin;
      const md5 = new Md5();
      const fdate = new Date();
      const realDate = (fdate.getUTCFullYear() + "-" + (fdate.getUTCMonth() + 1) + "-" + fdate.getUTCDate()).toString();

      const urlstring = API_server_url + 'document/umkd/?key=' + md5.appendStr(realDate).end() + "&iin=" + iin;
      console.log(urlstring);
      this.http.get(urlstring).subscribe(
        (data:any)=> {
          this.items = data;
        },
      )
      loadingPopup.dismiss();

  }
  // Выполняется при потягивании списка вниз, когда список находится в верхнем положении
  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }


}
