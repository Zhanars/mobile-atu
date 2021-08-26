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
        telephone: ['', [Validators.required]],
      });
  }
  async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.RegService.register(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Сервер недоступен. Попробуйте позже.',
          message: res.text,
          buttons: ['OK'],
        });
        await alert.present();
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
  get telephone() {
    return this.credentials.get('telephone');
  }


}
