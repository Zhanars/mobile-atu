import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Storage} from "@capacitor/storage";
import {INTRO_KEY} from "../../guards/intro.guard";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  showIntro() {
    Storage.set({key: INTRO_KEY, value: 'false'});
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async resetPasswordUniver() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Пожалуйста пододждите...',
      duration: 2000
    });
    await loading.present();
    await loading.dismiss();
    const alert = await this.alertController.create({
      message: "Отлично",
      buttons: ['OK'],
    });
    await alert.present();
  }
}
