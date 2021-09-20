import { Component, OnInit } from '@angular/core';
import {API_server_url} from "../../../environments/environment";
import {GenerateURLtokenService} from "../../services/generate-urltoken.service";
import {Strings} from "../../classes/strings";

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {
  public transcript_url: string;
  public schedule_subject_url: string;
  public schedule_exam_url: string;
  strings = Strings;
  constructor() {
    this.loadIin();
  }
  loadIin(){
    this.transcript_url = API_server_url + 'document/transcript/?key=' + GenerateURLtokenService.getKey() + "&iin=" + Strings.iin;
    this.schedule_subject_url = API_server_url + 'document/schedule_subject/?key=' + GenerateURLtokenService.getKey() + "&iin=" + Strings.iin;
    this.schedule_exam_url = API_server_url + 'document/schedule_exam/?key=' + GenerateURLtokenService.getKey() + "&iin=" + Strings.iin;
  }
  ngOnInit() {
  }

}
