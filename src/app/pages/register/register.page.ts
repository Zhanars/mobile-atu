import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegistrationService} from "../../services/registration.service";
import {IonLoaderService} from "../../services/ion-loader.service";
import {IonAlertService} from "../../services/ion-alert.service";
import {Strings} from "../../classes/strings";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;

  strings = Strings;
  constructor(private fb: FormBuilder,
              private RegService: RegistrationService,
              public ionLoaderService: IonLoaderService,
              private ionAlertService: IonAlertService,
              private router: Router) {

  }

  ngOnInit() {
      this.credentials = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        iin: ['', [Validators.required]],
        tel: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      });
  }
  register(){
    this.ionLoaderService.customLoader();
    this.RegService.register(this.credentials.value).subscribe(
      res => {
        this.ionLoaderService.dismissLoader();
        this.ionAlertService.showAlert('Ошибка', res.text, '');
        if (res.code == 11)
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
      res => {
        this.ionLoaderService.dismissLoader();
        this.ionAlertService.showAlert('Ошибка', 'Сервер недоступен, попробуйте позже', '');
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
