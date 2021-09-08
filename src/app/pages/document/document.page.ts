import { Component, OnInit } from '@angular/core';
import {API_server_url, AUTH_TOKEN_KEY} from "../../../environments/environment";
import {Storage} from "@capacitor/storage";
import {Md5} from "ts-md5";

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {
  public transcript_url: string;

  constructor() {
    this.loadIin();
  }
  async loadIin(){
    const token = await Storage.get({key: AUTH_TOKEN_KEY});
    const val = JSON.parse(token.value);
    const iin = val.iin;
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getUTCFullYear() + "-" + (fdate.getUTCMonth() + 1) + "-" + fdate.getUTCDate()).toString();
    this.transcript_url = API_server_url + 'document/transcript/?key=' + md5.appendStr(realDate).end() + "&iin=" + iin + '&dt=' + realDate;

  }
  ngOnInit() {
  }

}
