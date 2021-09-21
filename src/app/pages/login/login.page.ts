import {Component, NgZone, OnInit} from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Storage} from "@capacitor/storage";
import {AUTH_TOKEN_KEY, httpOptions} from "../../../environments/environment";
import {IonAlertService} from "../../services/ion-alert.service";
import {IonLoaderService} from "../../services/ion-loader.service";
import {PushNotifications, Token} from "@capacitor/push-notifications";
import {Capacitor} from "@capacitor/core";
import {Strings} from "../../classes/strings";
import {ConfigStrings} from "../../interfaces/config-strings";
import {SendServiceDataService} from "../../services/send-service-data.service";
import {AlertController} from "@ionic/angular";
import { HttpClient } from '@angular/common/http';
import {GenerateURLtokenService} from "../../services/generate-urltoken.service";
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
              public alertController: AlertController,
              private http: HttpClient,) {

  }
  async okiin(message) {
    const alert = await this.alertController.create({
      header: 'Внимание',
      message: message+'',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
 async notcorrectiin() {
    const alert = await this.alertController.create({
      header: 'Ошибка',
      message: 'Не корректный ИИН, попробуйте ввести заново',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async resetpassword() {
    const alert = await this.alertController.create({

      header: 'Для сброса пароля введите свой ИИН и нажмите ОК',
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
              const urlstring = "https://socket.atu.kz/api/profile/forgotpasswordmobile/" + '?key=' + GenerateURLtokenService.getKey() + '&iin=' + datas.resetpass;
              console.log(urlstring);
              return this.http.post(urlstring, new URLSearchParams({'iin':  datas.resetpass}), httpOptions)
              .subscribe(
                (val) => {
                  if(val['code']==2){
                    this.okiin(val['text']);
                  }
                  else if (val['code']==1){
                    this.okiin(val['email']+' '+val['text']);
                  }
                  },
            );

               }else{
               this.notcorrectiin();
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
        } else {
          ///fsdfsfsdfs
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: Token) => {
          this.setTokenFirebase(token.value);
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
