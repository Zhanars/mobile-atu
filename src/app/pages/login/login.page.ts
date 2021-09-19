import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Storage} from "@capacitor/storage";
import {AUTH_TOKEN_KEY} from "../../../environments/environment";
import {IonAlertService} from "../../services/ion-alert.service";
import {IonLoaderService} from "../../services/ion-loader.service";
import {PushNotifications, Token} from "@capacitor/push-notifications";
import {Capacitor} from "@capacitor/core";
import {Strings} from "../../classes/strings";

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
              private router: Router,
              private ionAlertService: IonAlertService) {

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
          Strings.setUser(res.message());
          this.authService.isAuthenticated.next(true);
          this.ionLoaderService.dismissLoader();
        } else {
          this.authService.isAuthenticated.next(false);
          this.ionLoaderService.dismissLoader();
          this.ionAlertService.showAlert(Strings.errorText, Strings.errorloginText, '');
        }
      },
      res => {
        this.ionLoaderService.dismissLoader();
        this.authService.isAuthenticated.next(false);
        this.ionAlertService.showAlert(Strings.errorText, Strings.errorserverText, '');
      }
    );
    this.authService.isAuthenticated.asObservable().subscribe(s=>{
      if (s)
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    });

  }


}
