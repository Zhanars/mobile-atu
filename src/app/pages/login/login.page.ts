import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular'
import { Router } from '@angular/router';
import {Storage} from "@capacitor/storage";
import {BehaviorSubject} from "rxjs";

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
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
          const key_value = JSON.stringify(res);
          let b = JSON.parse(key_value);
          if (b.code == 1){
            Storage.set({key: 'USER', value: key_value});
            await loading.dismiss();
            const alert = await this.alertController.create({
              message: "Отлично",
              buttons: ['OK'],
            });
            this.isAuthenticated.next(true);
            this.router.navigateByUrl('/tabs', {replaceUrl: true});
          } else {
            await loading.dismiss();
            const alert = await this.alertController.create({
              message: "Email/пароль не правильно",
              buttons: ['OK'],
            });
            this.isAuthenticated.next(false);
            await alert.present();
          }
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          message: "Сервер недоступен, попробуйте позже'",
          buttons: ['OK'],
        });
        this.isAuthenticated.next(false);
        await alert.present();
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


}
