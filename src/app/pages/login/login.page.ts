import {Component, NgZone, OnInit} from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Storage} from "@capacitor/storage";
import {API_server_url, AUTH_TOKEN_KEY, httpOptions} from "../../../environments/environment";
import {IonAlertService} from "../../services/ion-alert.service";
import {IonLoaderService} from "../../services/ion-loader.service";
import {
  PushNotification,
  PushNotificationActionPerformed,
  PushNotifications,
  Token
} from "@capacitor/push-notifications";
import {Capacitor} from "@capacitor/core";
import {Strings} from "../../classes/strings";
import {ConfigStrings} from "../../interfaces/config-strings";
import {SendServiceDataService} from "../../services/send-service-data.service";
import {AlertController} from "@ionic/angular";
import { HttpClient } from '@angular/common/http';
import {GenerateURLtokenService} from "../../services/generate-urltoken.service";
import { FCM } from "@capacitor-community/fcm";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  strings = Strings;
  credentials: FormGroup;
  data = {
    email: '',
    password: '',
    token_firebase: ''
  };

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              public ionLoaderService: IonLoaderService,
              private sendServiceDataService:SendServiceDataService,
              private router: Router,
              private ionAlertService: IonAlertService,
              private ngZone: NgZone,
              public alertController: AlertController) {

  }



  async resetpassword() {
    const alert = await this.alertController.create({
      header: Strings.enterIINandOkText,
      inputs: [
        {
          name: 'resetpass',
          type: 'number',
          label: 'resetpass'
        },
      ],
      buttons: [
         {
          text: 'Ok',
          handler: datas  => {
            if(datas.resetpass != null && datas.resetpass.length == 12){
              this.sendServiceDataService.resetMobilePassword(datas.resetpass).subscribe(
                (val) => {
                  if (val['code'] == 2) {
                    this.ionAlertService.showAlert(Strings.warningText, val['text']);
                  } else if (val['code'] == 1) {
                    this.ionAlertService.showAlert(Strings.warningText, val['email'] + ' ' +val['text']);
                  }
                },
            );
               }else{
              this.ionAlertService.showAlert(Strings.errorText, Strings.incorrectIINText);
            }
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnInit() {


    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }
  login() {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    this.ionLoaderService.customLoader();
    if (isPushNotificationsAvailable) {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
          console.log('fsdfsfsdfs111');
        } else {
          console.log('fsdfsfsdfs');
        }
      });

      PushNotifications.addListener('registration',
        (token: Token) => {
        console.log('token.value');
          FCM.getToken()
            .then((r) => {
              console.log('sdsds' + r.token);
              this.setTokenFirebase(r.token);
            });
        }
      );

    } else {
      this.setTokenFirebase('web');
    }

  }


  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  registerGo(){
    this.router.navigateByUrl('/register', { replaceUrl:true });
  }

  setTokenFirebase(value: string){
    this.data.token_firebase = value;
    this.data.email = this.credentials.controls['email'].value;
    this.data.password = this.credentials.controls['password'].value;
    console.log(this.data);
    this.authService.login(this.data).subscribe(
      (res: any) => {
        if (res.code == '1'){
          console.log(res.message);
          Storage.set({key: AUTH_TOKEN_KEY, value: JSON.stringify(res.message)});
          Strings.setUser(res.message);
          this.sendServiceDataService.loadStrings(res.message.user_lang).subscribe(
            (x:ConfigStrings)  => {
              Strings.setString(x);
            }
          );
          this.authService.isAuthenticated.next(true);
          this.ionLoaderService.dismissLoader();
        } else {
          this.authService.isAuthenticated.next(false);
          this.ionLoaderService.dismissLoader();
          this.ngZone.run(() => { this.ionAlertService.showAlert(Strings.errorText, Strings.errorloginText, '');});
        }
      },
      res => {
        this.ionLoaderService.dismissLoader();
        this.authService.isAuthenticated.next(false);
        this.ngZone.run(() => { this.ionAlertService.showAlert(Strings.errorText, Strings.errorserverText, '');});
      }
    );
    this.authService.isAuthenticated.asObservable().subscribe(s=>{
      if (s)
        this.ngZone.run(() => { this.router.navigateByUrl('/tabs/home', { replaceUrl: true });});
    });

  }


}
