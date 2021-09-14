import { Component, OnInit } from '@angular/core';
import {API_server_url, AUTH_TOKEN_KEY} from "../../../environments/environment";
import {Storage} from "@capacitor/storage";
import {GenerateURLtokenService} from "../../services/generate-urltoken.service";

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {
  public transcript_url: string;

  constructor(    private generateURLtokenService: GenerateURLtokenService  ) {
    this.loadIin();
  }
  async loadIin(){
    const token = await Storage.get({key: AUTH_TOKEN_KEY});
    const val = JSON.parse(token.value);
    const iin = val.iin;
    this.transcript_url = API_server_url + 'document/transcript/?key=' + this.generateURLtokenService.getKey() + "&iin=" + iin;
  }
  ngOnInit() {
  }

}
