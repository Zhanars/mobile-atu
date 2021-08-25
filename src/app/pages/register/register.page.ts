import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
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
