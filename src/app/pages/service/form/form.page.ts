import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Array_File_Inputs, Array_inputs, Array_selects, Array_textarea} from './input';
import {SendServiceDataService} from "../../../services/send-service-data.service";
import {IonLoaderService} from "../../../services/ion-loader.service";
import {IonAlertService} from "../../../services/ion-alert.service";
import {Strings} from "../../../classes/strings";


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {
  formG: FormGroup = new FormGroup({});
  form_id: number;
  formData = new FormData();
  strings = Strings;
  service_label: string;
  public formInputs: Array_inputs[] = [];
  public formSelects: Array_selects[] = [];
  public formFiles: Array_File_Inputs[] = [];
  public formTextarea: Array_textarea[] = [];
  constructor(public fb: FormBuilder,
              public ionLoaderService: IonLoaderService,
              private ionAlertService: IonAlertService,
              private serviceDataService: SendServiceDataService,
              private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.form_id = Number(routeParams.get('productId'));
  }
  loadData() {
    this.ionLoaderService.customLoader(Strings.loadingformText);
    this.serviceDataService.getFormElements(String(this.form_id)).subscribe(
      (data:any) => {
        this.service_label = data.service_label;
        if (data.message != '1') {
          this.ionLoaderService.dismissLoader();
          this.ionAlertService.showAlert(Strings.errorText, data.message, 'tabs/service');
        }
        this.setupForm(data.array_input);
        this.setupForm(data.array_select);
        this.setupForm(data.array_file);
        this.setupForm(data.array_file);
        this.setupForm(data.array_textarea);
        if (data.array_file.length > 0)           this.formFiles = data.array_file;
        if (data.array_input.length > 0)           this.formInputs = data.array_input;
        if (data.array_select.length > 0)           this.formSelects = data.array_select;
        if (data.array_textarea.length > 0)           this.formTextarea = data.array_textarea;
        this.ionLoaderService.dismissLoader();
      }, res => {
          this.ionAlertService.showAlert(Strings.errorText, Strings.errorserverText, 'tabs/service');
          this.ionLoaderService.dismissLoader();
        }
    );
  }
  ngOnInit() {
    this.loadData();
  }
  get value() {
    return this.formG.getRawValue();
  }
  setupForm(_properties) {
    _properties.forEach(element => {
      if (element.length > 0) {
        var key = element[0].control_name;
        var value = element[0].input_value;
        if (key == "username") value = Strings.username;
        if (key == "iin") value = Strings.iin;
        if (key == "email") value = Strings.email;
        if (key == "phone") value = Strings.telephone;
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
          this.ionAlertService.showAlert(Strings.successText, Strings.successSendFormText, 'tabs/service');
        } else {
          this.ionAlertService.showAlert(Strings.errorText, Strings.sendFormErrorText, 'tabs/service/form/' + this.form_id);
        }
        this.ionLoaderService.dismissLoader();
      },
      res => {
        console.log(res);
        this.ionAlertService.showAlert(Strings.errorText, Strings.errorserverText, 'tabs/service');
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

}

