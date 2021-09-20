import { Component, OnInit } from '@angular/core';
import {ConfigStrings} from "../../interfaces/config-strings";
import {SendServiceDataService} from "../../services/send-service-data.service";
import {Strings} from "../../classes/strings";
import {Storage} from "@capacitor/storage";
import {AUTH_TOKEN_KEY} from "../../../environments/environment";


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})

export class PopoverComponent implements OnInit {

  constructor(private sendServiceDataService:SendServiceDataService) { }
  public language(message: string){
    this.setUserData(message);
    Strings.user_lang = message;
    this.sendServiceDataService.setLang(message);
    this.sendServiceDataService.loadStrings(message).subscribe(
      (x:ConfigStrings)  => {
        Strings.setString(x);
      }
    );
  }
  async setUserData(message: string) {
    const token = await Storage.get({key: AUTH_TOKEN_KEY});
    let userData = JSON.parse(token.value);
    userData.user_lang = message;
    console.log(userData);
    Storage.set({key: AUTH_TOKEN_KEY, value: JSON.stringify(userData)});
  }
  ngOnInit() {}

}
