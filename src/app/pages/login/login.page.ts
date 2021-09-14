import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Storage} from "@capacitor/storage";
import {AUTH_TOKEN_KEY, httpOptions} from "../../../environments/environment";
import {IonAlertService} from "../../services/ion-alert.service";
import {IonLoaderService} from "../../services/ion-loader.service";
import {PushNotifications, Token} from "@capacitor/push-notifications";
import {GenerateURLtokenService} from "../../services/generate-urltoken.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
    this.ionLoaderService.customLoader();

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
      console.log('Qwerty123456Q: '+token.value);
        this.setTokenFirebase(token.value);
        console.log('Qwerty123456Q123: '+this.data.token_firebase);
      }
    );
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
      console.log('Qwerty123456Q1234: '+this.data.token_firebase);
      this.data.email = this.credentials.controls['email'].value;
      this.data.password = this.credentials.controls['password'].value;
      console.log(this.data);
      this.authService.login(this.data).subscribe(
        (res: any) => {
          if (res.code == '1'){
            Storage.set({key: AUTH_TOKEN_KEY, value: JSON.stringify(res.message)});
            this.ionLoaderService.dismissLoader();
            this.authService.isAuthenticated.next(true);
            this.router.navigateByUrl('/tabs/home', {replaceUrl: true});
          } else {
            this.ionLoaderService.dismissLoader();
            this.ionAlertService.showAlert('Ошибка', 'Email или пароль не правильный', '');
          }
        },
        res => {
          this.ionLoaderService.dismissLoader();
          this.ionAlertService.showAlert('Ошибка', 'Сервер недоступен, попробуйте позже', '');
        }
      );
      this.ionLoaderService.dismissLoader();
  }


}
