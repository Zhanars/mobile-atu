import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {Platform, NavParams} from '@ionic/angular';
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
              private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.form_id = Number(routeParams.get('productId'));
    console.log(this.formInputs);
  }
  async loadData() {
    let loadingPopup = await this.loadingCtrl.create({
      message: 'Загрузка...',
      cssClass: 'loader-css-class'
    });
    loadingPopup.present();
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getUTCFullYear() + "-" + (fdate.getUTCMonth() + 1) + "-" + fdate.getUTCDate()).toString();
    const urlstring = API_server_url + 'services/forms/?key=' + md5.appendStr(realDate).end() + "&form_id=" + this.form_id;
    console.log(urlstring);
    this.http.get(urlstring).subscribe(
      (data:any) => {
        this.setupForm(data.array_input);
      },
    );
    loadingPopup.dismiss();

  }
  ngOnInit() {
    this.loadData();
  }
  get value() {
    return this.formG.getRawValue();
  }

  saveDetails() {

  }
  setupForm(_properties) {
    var formData = {};
    _properties.forEach(element => {
      var key = element[0].control_name;
      formData[key] = [''];
      //here you can write logic if you want fields to be required
      if (true) {
        formData[key].push(Validators.required);
      }
    });
    this.formG = this.fb.group(formData);
    console.log(this.formG.controls);
    this.formInputs = _properties;
  }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
  onReset() {

  }
}

