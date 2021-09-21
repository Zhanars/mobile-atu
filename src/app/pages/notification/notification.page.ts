import {Component, NgZone, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {Strings} from "../../classes/strings";
import {SendServiceDataService} from "../../services/send-service-data.service";
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  strings = Strings;
  emails = [];
  constructor(
    private http: HttpClient,
    private popoverCtrl: PopoverController,
    private sendServiceDataService: SendServiceDataService,
    private ngZone: NgZone,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.sendServiceDataService.getNotification().subscribe(res => {
        this.emails = res;
        for (let e of this.emails) {
          // Create a custom color for every email
          console.log(res);
          e.color = this.intToRGB(this.hashCode(e.title));
        }
      });
    });
  }
  openDetails(id,read) {
    this.router.navigate([ 'tabs/notification/details', id]);
    if(!read)
    this.setReadedStatus(id);
  }
  private hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  private intToRGB(i) {
    const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return '#' + '00000'.substring(0, 6 - c.length) + c;
  }

  private setReadedStatus(id) {
    this.sendServiceDataService.setNotificationStatusRead(id).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  doRefresh(ev) {
    this.ngOnInit();
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }
}
