import { Injectable } from '@angular/core';
import {LoadingController} from "@ionic/angular";
import {Strings} from "../classes/strings";

@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {

  strings = Strings;
  constructor(public loadingController: LoadingController) { }

  // Simple loader
  simpleLoader(mess = this.strings.simpleLoaderText) {
    this.loadingController.create({
      message: mess,
      duration: 500,
      cssClass:'loader-css-class'
    }).then((response) => {
      response.present();
    });
  }

  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }

  // Auto hide show loader
  autoLoader() {
    this.loadingController.create({
      message: 'Loader hides after 4 seconds',
      duration: 500
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
        console.log('Loader dismissed', response);
      });
    });
  }

  // Custom style + hide on tap loader
  customLoader(mess = this.strings.customLoaderText) {
    this.loadingController.create({
      message: mess,
      duration: 500,
      cssClass:'loader-css-class',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }
}
