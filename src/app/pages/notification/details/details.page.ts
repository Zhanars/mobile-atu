import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Strings} from "../../../classes/strings";
import {SendServiceDataService} from "../../../services/send-service-data.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  strings = Strings;
  notificationId: number;
  notifications = [];
  title = '';
  constructor(private route: ActivatedRoute,
              private ngZone: NgZone,
              private sendServiceDataService: SendServiceDataService) {
    this.loadData();
  }

  ngOnInit() {

  }
  loadData(){
    const routeParams = this.route.snapshot.paramMap;
    this.notificationId = Number(routeParams.get('productId'));
    this.ngZone.run(() => {
      this.sendServiceDataService.getNotificationForId(this.notificationId).subscribe(res => {
        this.notifications = res;
        for (let e of this.notifications) {
          console.log(res);
          this.title = e.title;
        }
      });
    });
  }


  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
