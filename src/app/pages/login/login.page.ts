import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular'
import { Router } from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {Storage} from "@capacitor/storage";
import {AUTH_TOKEN_KEY} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private alertController: AlertController,
              private router: Router,
              private loadingController: LoadingController) {

  }
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  async login() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      duration: 2000,
      spinner: "dots"
    });
    await loading.present();
    let alert = await this.alertController.create();
    await this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        console.log(res);
        const key_value = JSON.stringify(res);
        let b = JSON.parse(key_value);
        if (b.code == '1'){
          Storage.set({key: AUTH_TOKEN_KEY, value: JSON.stringify(b.message)});
          this.isAuthenticated.next(true);
        } else {
          alert.message = "Email/пароль не правильно";
          alert.buttons = ['OK'];
          await alert.present();
          this.isAuthenticated.next(false);
        }
      },
      async (res) => {
        alert.message = "Сервер недоступен, попробуйте позже";
        alert.buttons = ['OK'];
        await alert.present();
        this.isAuthenticated.next(false);
      }
    );
    await loading.dismiss();
    if (this.isAuthenticated.getValue()){
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
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


}
