import {Component, NgZone, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {NavigationEnd, Router} from "@angular/router";
import {Service} from "./service";
import {IonLoaderService} from "../../services/ion-loader.service";
import {Strings} from "../../classes/strings";
import {SendServiceDataService} from "../../services/send-service-data.service";

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {

  items: Service[] = [];
  strings = Strings;

  constructor(private router: Router,
              private readonly loadingCtrl: LoadingController,
              private sendServiceDataService: SendServiceDataService,
              private readonly ngZone: NgZone
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.clear();
        this.loadData();
      }
    });
  }

  ngOnInit() { }

  searchService() {
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
  loadData() {
    this.ngZone.run(() => {this.sendServiceDataService.getServices().subscribe(      (data:any)=> { this.items = data; }    );});
  }

  doRefresh(event) {
    setTimeout(() => { this.loadData(); event.target.complete();}, 1000);
  }
}
