import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IonAlertService {

  constructor(public alertController: AlertController, private router: Router) { }

  showAlert(header, text, url) {
    this.alertController.create({
      header: 'Внимание',
      subHeader: header,
      message: text,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (url != '') {
            this.router.navigateByUrl('/' + url, {replaceUrl: true});
          }
        }
      }]
    }).then(res => {
      res.present();
    });

  }

  showConfirm() {
    this.alertController.create({
      header: 'Confirm Alert',
      subHeader: 'Beware lets confirm',
      message: 'Are you sure? you want to leave without safty mask?',
      buttons: [
        {
          text: 'Never',
          handler: () => {
            console.log('I care about humanity');
          }
        },
        {
          text: 'Not Sure',
          handler: () => {
            console.log('Let me think');
          }
        },
        {
          text: 'Yes!',
          handler: () => {
            console.log('Whatever');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  showPrompt() {
    this.alertController.create({
      header: 'Prompt Alert',
      subHeader: 'Enter information requested',
      message: 'Enter your favorate place',
      inputs: [
        {
          name: 'Place',
          placeholder: 'Eg.NY',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Done!',
          handler: (data: any) => {
            console.log('Saved Information', data);
            return data;
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
