import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Strings} from "../classes/strings";
import {SendServiceDataService} from "./send-service-data.service";
import {IonLoaderService} from "./ion-loader.service";


@Injectable({
  providedIn: 'root'
})
export class IonAlertService {

  strings = Strings;
  constructor(
    public alertController: AlertController,
    private router: Router,
    private ionLoaderService: IonLoaderService,
    private sendServiceDataService: SendServiceDataService) { }

  showAlert(header, text, url = '') {
    this.alertController.create({
      header: header,
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

  showConfirm(header, text, url, OkBtn='OK',CancelBtn='Cancel') {
    this.alertController.create({
      header: header,
      message: text,
      buttons: [
        {
          text: CancelBtn
        },{
          text: OkBtn,
          handler: () => {
            if (url != '') {
              this.router.navigateByUrl('/' + url, {replaceUrl: true});
            }
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  showConfirm2(header, text, OkBtn='OK',CancelBtn='Cancel') {
    this.alertController.create({
      header: header,
      message: text,
      buttons: [
        {
          text: CancelBtn
        },{
          text: OkBtn,
          handler: () => {
            this.sendServiceDataService.resetPasswordInUniver();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  showPrompt(header:string, btnCnl:string, btnOk: string) {
    this.alertController.create({
      header: header,
      inputs: [
        {
          name: 'problem',
          type: 'textarea',
          label: 'problem'

        },
      ],
      buttons: [
        {
          text: btnCnl,
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: btnOk,
          handler: (data: any) => {
            this.ionLoaderService.customLoader();
            this.sendServiceDataService.sendProblemText(data).subscribe(
              (res) =>{
                this.ionLoaderService.dismissLoader();
                this.showAlert(Strings.successText, Strings.successSendFormText, '');
            },
              res => {
                console.log(res);
                this.showAlert(Strings.errorText, Strings.errorserverText, '');
                this.ionLoaderService.dismissLoader();
              }
            );
            return data;
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
