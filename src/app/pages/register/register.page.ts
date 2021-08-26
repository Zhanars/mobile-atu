import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {RegistrationService} from "../../services/registration.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;

  constructor(private fb: FormBuilder,
              private RegService: RegistrationService,
              private alertController: AlertController,
              private router: Router,
              private loadingController: LoadingController) { }

  ngOnInit() {
      this.credentials = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        iin: ['', [Validators.required]],
        tel: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      });
  }
  async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.RegService.register(this.credentials.value).subscribe(
      async (res) => {
        const alert = await this.alertController.create({
          message: res.text,
          buttons: ['OK'],
        });
        await alert.present();
        await loading.dismiss();
        if (res.code == 11)
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
      async (res) => {
        const alert = await this.alertController.create({
          message: 'Сервер недоступен, попробуйте позже',
          buttons: ['OK'],
        });
        await alert.present();
        await loading.dismiss();
      }
    );
  }
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
  get iin() {
    return this.credentials.get('iin');
  }
  get tel() {
    return this.credentials.get('tel');
  }


}
