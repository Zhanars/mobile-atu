import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import {HOME_page_url, httpOptions} from '../../../environments/environment';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token, PushNotification, PushNotificationActionPerformed, PushNotificationToken,
} from '@capacitor/push-notifications';
import {SendServiceDataService} from "../../services/send-service-data.service";
import {GenerateURLtokenService} from "../../services/generate-urltoken.service";
import {HttpClient} from "@angular/common/http";


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

  home_page_url;
  constructor(private authService: AuthenticationService, private router: Router, private domSanitizer : DomSanitizer,
              private serviceDataService: SendServiceDataService,private http: HttpClient) {
    this.home_page_url = this.domSanitizer.bypassSecurityTrustResourceUrl(HOME_page_url);
  }
  ngOnInit() {
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

        console.log(token.value);
        const urlstring = 'https://3b32-37-228-66-82.ngrok.io/token/?key=' + GenerateURLtokenService.getKey();
        this.http.post(urlstring, new URLSearchParams({'token': 'dsadsadsadsadsad'}), httpOptions).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
      }
    );
  }
}

