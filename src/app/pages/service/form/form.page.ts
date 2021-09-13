import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {Platform, NavParams, AlertController} from '@ionic/angular';
import {LoadingController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl, SafeValue} from '@angular/platform-browser';
import {API_server_url, AUTH_TOKEN_KEY, environment, httpOptions} from '../../../../environments/environment';
import {catchError, finalize, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Upload} from 'tus-js-client';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {ActivatedRoute} from "@angular/router";
import {Storage} from "@capacitor/storage";
import {Md5} from "ts-md5";
import {Array_inputs, Array_selects} from "./input";
import {ValidationService} from "../../../services/validation.service";
import {GenerateURLtokenService} from "../../../services/generate-urltoken.service";


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {
  sub: any;
  public tus = false;
  public error: string | null = null;
  photo: SafeResourceUrl | null = null;
  blobtext: SafeValue;
  conblob: string;
  userData: any;
  private counter = 0;
  private loading: HTMLIonLoadingElement | null = null;
  formG: FormGroup = new FormGroup({});
  submitted = false;
  albums = [];
  form_id: number;
  public formInputs: Array_inputs[] = [];
  public formSelects: Array_selects[] = [];
  formFile: Array<{
    formControlName: string;
    label: string;
  }> = [];
  @Input() control: FormControl;
  constructor(public fb: FormBuilder,
              public plt: Platform,
              private readonly http: HttpClient,
              private readonly sanitizer: DomSanitizer,
              public loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private alertController: AlertController,
              private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.form_id = Number(routeParams.get('productId'));
  }
  async loadData() {
    let loadingPopup = await this.loadingCtrl.create({
      message: 'Загрузка...',
      cssClass: 'loader-css-class'
    });
    loadingPopup.present();
    const token = await Storage.get({key: AUTH_TOKEN_KEY});
    this.userData = JSON.parse(token.value);
    console.log(this.userData);
    const urlstring = API_server_url + 'services/forms/?key=' + GenerateURLtokenService.getKey() + "&form_id=" + this.form_id;
    console.log(urlstring);
    this.http.get(urlstring).subscribe(
      (data:any) => {
        this.setupForm(data.array_input);
        this.setupForm(data.array_select);
        this.formInputs = data.array_input;
        this.formSelects = data.array_select;
      },
    );
    loadingPopup.dismiss();

  }
  ngOnInit() {
    this.loadData();
    console.log(this.formG.controls);
  }
  get value() {
    return this.formG.getRawValue();
  }
  setupForm(_properties) {
    _properties.forEach(element => {
      var key = element[0].control_name;
      var value = element[0].input_value;
      if (key == "username")  value = this.userData.username;
      if (key == "iin")  value = this.userData.iin;
      if (key == "email")  value = this.userData.email;
      if (key == "phone")  value = this.userData.telephone;
      this.formG.addControl(key, this.fb.control(value, Validators.required));
    });
  }
  onReset() {

  }

  async sendData() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const urlstring = API_server_url + 'services/form/insert.php?key=' +  GenerateURLtokenService.getKey() + '&select_id=' + this.form_id;
    this.http.post(urlstring, new URLSearchParams(this.formG.value), httpOptions).subscribe(
      async (res) => {
        const alert = await this.alertController.create({
          message: "Заявка отправлена на рассмотрение",
          buttons: ['OK'],
        });
        await loading.dismiss();
        await alert.present();
      },
      async (res) => {
        const alert = await this.alertController.create({
          message: 'Сервер недоступен, попробуйте позже',
          buttons: ['OK'],
        });
        await loading.dismiss();
        await alert.present();
      }
    );
  }
}

