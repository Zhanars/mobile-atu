import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {Platform, AlertController} from '@ionic/angular';
import {LoadingController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl, SafeValue} from '@angular/platform-browser';
import { AUTH_TOKEN_KEY } from '../../../../environments/environment';
import {catchError, finalize, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Upload} from 'tus-js-client';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {ActivatedRoute} from "@angular/router";
import {Storage} from "@capacitor/storage";
import {Array_File_Inputs, Array_inputs, Array_selects} from "./input";
import {SendServiceDataService} from "../../../services/send-service-data.service";


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
  formData = new FormData();
  public formInputs: Array_inputs[] = [];
  public formSelects: Array_selects[] = [];
  public formFiles: Array_File_Inputs[] = [];
  @Input() control: FormControl;
  constructor(public fb: FormBuilder,
              public plt: Platform,
              private readonly http: HttpClient,
              private readonly sanitizer: DomSanitizer,
              public loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private alertController: AlertController,
              private serviceDataService: SendServiceDataService,
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
    this.serviceDataService.getFormElements(String(this.form_id)).subscribe(
      (data:any) => {
        this.setupForm(data.array_input);
        this.setupForm(data.array_select);
        this.setupForm(data.array_file);
        if (data.array_file.length > 0) this.formG.addControl('avatar', this.fb.control(null, Validators.required));
        this.formInputs = data.array_input;
        this.formSelects = data.array_select;
        this.formFiles = data.array_file;
      },
    );
    loadingPopup.dismiss();

  }
  ngOnInit() {
    this.loadData();
    console.log(this.formG.controls);
    this.serviceDataService.testSend();
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
    Object.keys(this.formG.controls).forEach(key => {
      this.formData.append(key, this.formG.controls[key].value);
    });
    this.serviceDataService.sendFile(this.formData, String(this.form_id)).subscribe(
      async (res) => {
        console.log(res);
        const alert = await this.alertController.create({
          message: "Заявка отправлена на рассмотрение",
          buttons: ['OK'],
        });
        await loading.dismiss();
        await alert.present();
      },
      async (res) => {

        console.log(res);
        const alert = await this.alertController.create({
          message: 'Сервер недоступен, попробуйте позже',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
    await loading.dismiss();
  }

  uploadFile(event, control_name) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formG.patchValue({
        avatar: file
      });
    }
    this.formG.get('avatar').updateValueAndValidity();
    this.formData.append(control_name, this.formG.controls['avatar'].value);
  }
}

