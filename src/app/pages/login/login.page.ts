import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Storage} from "@capacitor/storage";
import {AUTH_TOKEN_KEY} from "../../../environments/environment";
import {IonAlertService} from "../../services/ion-alert.service";
import {IonLoaderService} from "../../services/ion-loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
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
    this.authService.login(this.credentials.value).subscribe(
      res => {
        console.log(res);
        const key_value = JSON.stringify(res);
        let b = JSON.parse(key_value);
        if (b.code == '1'){
          Storage.set({key: AUTH_TOKEN_KEY, value: JSON.stringify(b.message)});
          this.ionLoaderService.dismissLoader();
          this.router.navigateByUrl('/tabs', { replaceUrl:true });
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


}
