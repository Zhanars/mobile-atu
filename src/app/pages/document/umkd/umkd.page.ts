import {Component, NgZone} from '@angular/core';
import {Subject} from "./subject";
import {Strings} from "../../../classes/strings";
import {SendServiceDataService} from "../../../services/send-service-data.service";
import {IonLoaderService} from "../../../services/ion-loader.service";

@Component({
  selector: 'app-umkd',
  templateUrl: './umkd.page.html',
  styleUrls: ['./umkd.page.scss'],
})
export class UmkdPage{

  public items: Subject[] = [];
  strings = Strings;
  constructor(
    private sendServiceDataService: SendServiceDataService,
    private ngZone: NgZone,
    private readonly ionLoaderService: IonLoaderService
  ) {
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
  loadData() {
    this.ionLoaderService.customLoader();
    this.ngZone.run(() => { this.sendServiceDataService.getUMKD().subscribe((data: any) => {  this.items = data;  }  );});
    this.ionLoaderService.dismissLoader();
  }
  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
