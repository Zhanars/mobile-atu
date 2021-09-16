import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {Platform} from '@ionic/angular';
import {LoadingController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {API_server_url, AUTH_TOKEN_KEY} from '../../../../environments/environment';
import {ActivatedRoute} from "@angular/router";
import {Storage} from "@capacitor/storage";
import {Array_File_Inputs, Array_inputs, Array_selects, Array_textarea} from './input';
import {SendServiceDataService} from "../../../services/send-service-data.service";
import {IonLoaderService} from "../../../services/ion-loader.service";
import {IonAlertService} from "../../../services/ion-alert.service";
import {Md5} from "ts-md5";
import {Service} from "../service";


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {
  public itemsService: Service[] = [];
  userData: any;
  formG: FormGroup = new FormGroup({});
  form_id: number;
  formData = new FormData();
  public formInputs: Array_inputs[] = [];
  public formSelects: Array_selects[] = [];
  public formFiles: Array_File_Inputs[] = [];
  public formTextarea: Array_textarea[] = [];
  constructor(public fb: FormBuilder,
              public ionLoaderService: IonLoaderService,
              private ionAlertService: IonAlertService,
              private serviceDataService: SendServiceDataService,
              private route: ActivatedRoute,
              private readonly http: HttpClient) {
    const routeParams = this.route.snapshot.paramMap;
    this.form_id = Number(routeParams.get('productId'));
  }
  async loadData() {
    this.ionLoaderService.customLoader('Загрузка формы');
    const token = await Storage.get({key: AUTH_TOKEN_KEY});
    this.userData = JSON.parse(token.value);
    this.serviceDataService.getFormElements(String(this.form_id)).subscribe(
      (data:any) => {
        this.setupForm(data.array_input);
        this.setupForm(data.array_select);
        this.setupForm(data.array_file);
        this.setupForm(data.array_textarea);
        if (data.array_file.length > 0)           this.formFiles = data.array_file;
        if (data.array_input.length > 0)           this.formInputs = data.array_input;
        if (data.array_select.length > 0)           this.formSelects = data.array_select;
        if (data.array_textarea.length > 0)           this.formTextarea = data.array_textarea;
        this.ionLoaderService.dismissLoader();
      }, res => {
          this.ionAlertService.showAlert('Ошибка', 'Сервер недоступен, попробуйте позже', 'tabs/service');
          this.ionLoaderService.dismissLoader();
        }
    );

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
      if (element.length > 0) {
        var key = element[0].control_name;
        var value = element[0].input_value;
        if (key == "username") value = this.userData.username;
        if (key == "iin") value = this.userData.iin;
        if (key == "email") value = this.userData.email;
        if (key == "phone") value = this.userData.telephone;
        this.formG.addControl(key, this.fb.control(value, Validators.required));
      }
    });
  }
  sendData() {
    this.ionLoaderService.customLoader();
    Object.keys(this.formG.controls).forEach(key => {
        this.formData.append(key, this.formG.controls[key].value);
    });
    this.serviceDataService.sendFile(this.formData, String(this.form_id)).subscribe(
      (res: any) => {
        console.log(res);
        if (res.code  == 11) {
          this.ionAlertService.showAlert('Удачно', 'Заявка отправлена на рассмотрение', 'tabs/service');
        } else {
          this.ionAlertService.showAlert('Ошибка', 'Ошибка при сохранении. Проверьте данные и попробуйте позже', 'tabs/service/form/' + this.form_id);
        }
        this.ionLoaderService.dismissLoader();
      },
      res => {
        this.ionAlertService.showAlert('Ошибка', 'Сервер недоступен, попробуйте позже', 'tabs/service');
        this.ionLoaderService.dismissLoader();
      }
    );
  }
  uploadFile(event) {
    this.formData.delete('avatar[]');
    if (event.target.files.length > 0) {
      for (var i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.formData.append('avatar[]', file);
      }
    }
  }
  async getFormName() {
    const token = await Storage.get({key: AUTH_TOKEN_KEY});
    const val = JSON.parse(token.value);
    const md5 = new Md5();
    const fdate = new Date();
    const realDate = (fdate.getUTCFullYear() + "-" + (fdate.getUTCMonth() + 1) + "-" + fdate.getUTCDate()).toString();
    const urlstring = API_server_url + 'services/get/?key=' + md5.appendStr(realDate).end() + '&service=' + this.form_id;
    this.http.get(urlstring).subscribe(
      (data: any) => {
        console.log(data);
        this.itemsService = data;
      },
    );
  }

}

