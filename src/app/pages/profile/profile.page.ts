import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Storage} from "@capacitor/storage";
import {INTRO_KEY} from "../../guards/intro.guard";
import { PopoverComponent } from '../../components/popover/popover.component';
import {Strings} from "../../classes/strings";
import {IonLoaderService} from "../../services/ion-loader.service";
import {IonAlertService} from "../../services/ion-alert.service";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  strings = Strings;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private ionAlertService: IonAlertService,
    private ionLoaderService: IonLoaderService,
    public popoverController: PopoverController,
    public alertController: AlertController
  ) {}
  showConfirm() {
    this.alertController.create({
      header: 'Подтверждение',
      message: 'Вы точно хотите сбросить пароль от системы Univer?',
      buttons: [
        {
          text: 'нет',
          handler: () => {
          }
        },
        {
          text: 'да!',
          handler: () => {
            this.resetPasswordUniver();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  async presentAlertCheckbox() {
    const alert = await this.alertController.create({

      header: 'Опишите проблему',
      inputs: [
        {
          name: 'problem',
          type: 'textarea',
          label: 'problem'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentPopover(eve) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {
              },
      cssClass: 'popOver',
      event: eve,
      mode:'ios',
      translucent: true
    });
   await popover.present();
  }
  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  showIntro() {
    Storage.set({key: INTRO_KEY, value: 'false'});
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async resetPasswordUniver() {
    this.ionLoaderService.simpleLoader();
    this.ionLoaderService.dismissLoader();
    this.ionAlertService.showAlert(this.strings.successText, this.strings.successText);
  }

}

