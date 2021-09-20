import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import {HOME_page_url, httpOptions} from '../../../environments/environment';
import {  PushNotification,  PushNotificationActionPerformed,  PushNotifications,  Token } from '@capacitor/push-notifications';
import {SendServiceDataService} from '../../services/send-service-data.service';
import {GenerateURLtokenService} from '../../services/generate-urltoken.service';
import {HttpClient} from '@angular/common/http';
import {IonAlertService} from "../../services/ion-alert.service";
import {Capacitor} from "@capacitor/core";
import {Strings} from "../../classes/strings";

@Pipe({ name: 'safe' })

export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  transform(HOME_page_url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(HOME_page_url);
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
  constructor(private authService: AuthenticationService, private router: Router, private domSanitizer: DomSanitizer,
              private serviceDataService: SendServiceDataService,private http: HttpClient,private ionAlertService: IonAlertService) {
    this.home_page_url = this.domSanitizer.bypassSecurityTrustResourceUrl(HOME_page_url);
  }
  ngOnInit() {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if (isPushNotificationsAvailable) {
      this.setNotification();
    }
  }
  setNotification(){
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        const urlstring = 'http://c334-37-228-66-82.ngrok.io/token/?key=' + GenerateURLtokenService.getKey();
        this.http.post(urlstring, new URLSearchParams({token: token.value}), httpOptions).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
      }
    );

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

