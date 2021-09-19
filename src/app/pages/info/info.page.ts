import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
import {Strings} from "../../classes/strings";

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  productInformation=null
  barCode: any;
  strings = Strings;
  constructor(public barcodeScanner : BarcodeScanner) {}



  openBarCodeScanner(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.barCode = barcodeData;
      //   Barcode data {"cancelled":0,"text":"8413384010008","format":"EAN_13"}
    }).catch(err => {
      console.log('Error', err);
    });
  }
  ngOnInit(): void {
  }
}




