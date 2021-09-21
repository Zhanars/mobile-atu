import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import {HOME_page_url} from '../../../environments/environment';
import {Strings} from "../../classes/strings";
import {PushNotification, PushNotificationActionPerformed, PushNotifications} from "@capacitor/push-notifications";
import {IonAlertService} from "../../services/ion-alert.service";

@Pipe({ name: 'safe' })

export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  transform(page_url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(page_url);
  }
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  strings = Strings;
  home_page_url;
  constructor(private authService: AuthenticationService, private router: Router, private ionAlertService: IonAlertService, private domSanitizer: DomSanitizer) {
    console.log(HOME_page_url[Strings.user_lang]);
    this.home_page_url = this.domSanitizer.bypassSecurityTrustResourceUrl(HOME_page_url[Strings.user_lang]);
  }
  ngOnInit() {
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        this.router.navigateByUrl('/tabs/notification', { replaceUrl:true });
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        this.ionAlertService.showConfirm(Strings.gotMessageText, notification.body, 'tabs/notification',Strings.gotoText,Strings.hideText);
      }
    );
  }
}

