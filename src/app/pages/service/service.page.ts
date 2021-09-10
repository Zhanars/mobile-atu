import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  constructor(private router: Router) {
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
}
