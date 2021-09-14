import { Injectable } from '@angular/core';
import {Md5} from "ts-md5";
import {API_server_url} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GenerateURLtokenService {

  constructor() { }

  static getKey() {
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getUTCFullYear() + "-" + (fdate.getUTCMonth() + 1) + "-" + fdate.getUTCDate()).toString();
    return md5.appendStr(realDate).end();
  }

  getKey() {
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getUTCFullYear() + "-" + (fdate.getUTCMonth() + 1) + "-" + fdate.getUTCDate()).toString();
    return md5.appendStr(realDate).end();
  }
}
