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
  public schedule_subject_url: string;
  public schedule_exam_url: string;

  constructor(    private generateURLtokenService: GenerateURLtokenService  ) {
    this.loadIin();
  }
  async loadIin(){
    const token = await Storage.get({key: AUTH_TOKEN_KEY});
    const val = JSON.parse(token.value);
    const iin = val.iin;
    this.transcript_url = API_server_url + 'document/transcript/?key=' + this.generateURLtokenService.getKey() + "&iin=" + iin;
    this.schedule_subject_url = API_server_url + 'document/schedule_subject/?key=' + this.generateURLtokenService.getKey() + "&iin=" + iin;
    this.schedule_exam_url = API_server_url + 'document/schedule_exam/?key=' + this.generateURLtokenService.getKey() + "&iin=" + iin;
  }
  ngOnInit() {
  }

}
