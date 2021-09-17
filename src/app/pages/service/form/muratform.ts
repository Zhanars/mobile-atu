/*
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {httpOptions} from "../../../../environments/environment";
import {catchError, finalize} from "rxjs/operators";
import {Upload} from "tus-js-client";
import {Observable, throwError} from "rxjs";

<ion-item class="ion-margin-bottom">
  <ion-label position="floating">Курс</ion-label>
  <ion-select placeholder="Выберите" formControlName="course">
  <ion-select-option value="m">1</ion-select-option>
  <ion-select-option value="f">2</ion-select-option>
  <ion-select-option value="m">3</ion-select-option>
  <ion-select-option value="f">4</ion-select-option>
  <ion-select-option value="m">5</ion-select-option>
  </ion-select>
  </ion-item>

  <ion-item class="ion-margin-bottom">
  <ion-label position="floating">Национальность</ion-label>
  <ion-select placeholder="Выберите" formControlName="national">
  <ion-select-option value="m">казах/казашка</ion-select-option>
  <ion-select-option value="f">русский/русская</ion-select-option>
  </ion-select>
  </ion-item>

  <ion-item class="ion-margin-bottom">
  <ion-label position="floating">Пол</ion-label>
  <ion-select placeholder="Выберите" formControlName="gender">
  <ion-select-option value="m">мужской</ion-select-option>
  <ion-select-option value="f">женский</ion-select-option>
  </ion-select>
  </ion-item>

  <ion-item class="ion-margin-bottom">
  <ion-label position="floating">Название группы</ion-label>
<ion-input type="text" formControlName="groupname"></ion-input>
  </ion-item>

  <ion-item class="ion-margin-bottom">
  <ion-label position="floating">Фамилия</ion-label>
  <ion-input type="text" formControlName="lastname"></ion-input>
  </ion-item>


  <ion-item class="ion-margin-bottom">
  <ion-label position="floating">Имя</ion-label>
  <ion-input type="text" formControlName="name"></ion-input>
  </ion-item>


  <ion-item class="ion-margin-bottom">
  <ion-label position="floating">Отчество</ion-label>
  <ion-input type="text" formControlName="secondname"></ion-input>
  </ion-item>

  <ion-item class="ion-margin-bottom">
  <ion-label position="floating">Номер телефона</ion-label>
<ion-input type="text" formControlName="phone"></ion-input>
</ion-item>
<small *ngIf="form.get('phone').invalid && (form.get('phone').dirty ||form.get('phone').touched )">
<small *ngIf="(form.get('phone')).errors?.required">Name is required</small>
<!--question mark(?) is a safe navigation operator-->
<small *ngIf="(form.get('phone')).errors?.pattern">Не корректный номер телефона</small>
</small>

<ion-item class="ion-margin-bottom">
  <ion-label position="floating">ИИН</ion-label>
  <ion-input type="text" formControlName="iin"></ion-input>
</ion-item>
<small *ngIf="form.get('iin').invalid && (form.get('iin').dirty ||form.get('iin').touched )">
<small *ngIf="(form.get('iin')).errors?.required">Name is required</small>
<!--question mark(?) is a safe navigation operator-->
<small *ngIf="(form.get('iin')).errors?.minlength">Не корректный ИИН</small>
<small *ngIf="(form.get('iin')).errors?.pattern">Не корректный ИИН</small>
</small>

<ion-item class="ion-margin-bottom">
  <ion-label position="floating">Email</ion-label>
  <ion-input type="email" formControlName="email"></ion-input>
</ion-item>

<div *ngIf="(form.get('email').invalid && (form.get('email')).touched) || (form.get('email')).dirty">
<small *ngIf="(form.get('email')).errors?.required">Email is required</small>
<!--question mark(?) is a safe navigation operator-->
<small *ngIf="(form.get('email')).errors?.pattern">Please provide a valid email address</small>
</div>


<ion-item class="ion-margin-bottom">
  <ion-label position="floating">Дата рождения</ion-label>
<ion-datetime formControlName="dob" displayFormat="MM/DD/YYYY" min="1994-03-14" max="2022-12-09">
</ion-datetime>
</ion-item>

<small *ngIf="form.get('dob').invalid && (form.get('dob').dirty ||form.get('dob').touched )">
  DOB is required.
</small>

<ion-item class="ion-margin-bottom">
  <ion-label position="floating">Город</ion-label>
  <ion-input type="text" formControlName="city"></ion-input>
  </ion-item>

  <ion-item class="ion-margin-bottom">
  <ion-label position="floating">Район</ion-label>
  <ion-input type="text" formControlName="district"></ion-input>
  </ion-item>

  <ion-item class="ion-margin-bottom">
  <ion-label position="floating">Область</ion-label>
  <ion-input type="text" formControlName="region"></ion-input>
  </ion-item>

  <ion-item class="ion-margin-bottom">
  <ion-grid>

  <ion-row>
  <ion-col size="6">
<ion-button (click)="takePhoto()" color="danger" expand="full" shape="round" size="large" type="button">
  <ion-icon  name="camera"></ion-icon>
  </ion-button>
  </ion-col>
  <ion-col size="6">
<ion-button (click)="selectPhoto()" color="secondary" expand="full" shape="round" size="large" type="button">
  <ion-icon name="image"></ion-icon>
  </ion-button>
  </ion-col>
  </ion-row>

  <ion-row>
  <ion-col size="12">
  <ion-text color="danger">
  <strong>{{error}}</strong>
</ion-text>
</ion-col>
</ion-row>

<ion-row>
<ion-col  size="12">
<img formControlName="image" *ngIf="photo" [src]="photo"/>
  <ion-input type="text" formControlName="image"></ion-input>
  </ion-col>
  </ion-row>

  </ion-grid>
  </ion-item>















}
saveDetails() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.form.invalid) {
    return;
  }
  this.form.get('image').setValue(this.blobtext);
  // display form values on success
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
}

onReset() {
  this.submitted = false;
  this.form.reset();}

async takePhoto(): Promise<void> {
  const ab = await this.getPhoto(CameraSource.Camera);
  if (ab) {
    if (this.tus) {
      await this.uploadTus(ab);
    } else {
      await this.uploadAll(ab);
    }
  }
}

async selectPhoto(): Promise<void> {
  const ab = await this.getPhoto(CameraSource.Photos);
  if (ab) {
    if (this.tus) {
      await this.uploadTus(ab);
    } else {
      await this.uploadAll(ab);
    }
  }
}

private async getPhoto(source: CameraSource): Promise<string | undefined> {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    source
  });

  if (image.webPath) {
  this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
  this.http.get(image.webPath, { responseType: 'text'}).subscribe(data => {
    this.blobtext=data;
    console.log(this.blobtext);
  });
}
return image.webPath;
}


private async uploadAll(webPath: string): Promise<void> {
  this.loading = await this.loadingCtrl.create({
    message: 'Uploading.111..'
  });
  await this.loading.present();
  const blob = await fetch(webPath).then(r => r.blob());
  const formData = new FormData();
  formData.append('file', blob, `file-${this.counter++}.jpg`);
  this.http.post<boolean>(`https://socket.atu.kz/api/`, formData,  httpOptions)
    .pipe(
      catchError(e => this.handleError(e)),
      finalize(() => this.loading?.dismiss())
    )
    .subscribe(ok => this.showToast(ok));
  console.log('asd');
}

private async uploadTus(webPath: string): Promise<void> {

  this.loading = await this.loadingCtrl.create({
    message: 'Uploading...'
  });
  await this.loading.present();
  const blob = await fetch(webPath).then(r => r.blob());
  const upload = new Upload(blob, {
    endpoint: `localhost:8200/upload`,
    retryDelays: [0, 3000, 6000, 12000, 24000],
    chunkSize: 512 * 1024,
    metadata: {
      filename: `file-${this.counter++}.jpg`
    },
    onError: () => {
      this.showToast(false);
      this.loading?.dismiss();
    },
    onSuccess: () => {
      this.showToast(true);
      this.loading?.dismiss();
    }
  });

  upload.start();
}

private async showToast(ok: boolean): Promise<void> {
  if (ok) {
    const toast = await this.toastCtrl.create({
      message: 'Upload successful',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  } else {
    const toast = await this.toastCtrl.create({
      message: 'Upload failed',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}



private handleError(error: any): Observable<never> {
  const errMsg = error.message ? error.message : error.toString();
  this.error = errMsg;
  return throwError(errMsg);
}



this.form = this.fb.group({
  dfaculty: [null, [Validators.required]],
  course: [null, [Validators.required]],
  national: [null, [Validators.required]],
  gender: [null, [Validators.required]],
  groupname: [null, [Validators.required]],
  lastname: [null, [Validators.required, Validators.minLength(5)]],
  name: [null, [Validators.required, Validators.minLength(5)]],
  secondname: [null, [Validators.required, Validators.minLength(5)]],
  iin: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern(/^[0-9]\d*$/)]],
  phone: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
  city: [null, [Validators.required]],
  district: [null, [Validators.required]],
  region: [null, [Validators.required]],
  dob: [null, [Validators.required]],
  email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  image:[this.blobtext]
});




Поиск/search
<div class="search-overlay ion-align-items-center" slot="fixed" #search>
    <ion-row>
      <ion-col size="2">
        <ion-menu-button color="dark"></ion-menu-button>
      </ion-col>
      <ion-col size="8">
        <ion-input placeholder="Search in emails"></ion-input>
      </ion-col>
      <ion-col size="2">
        <ion-avatar tappable (click)="openAccount($event)">
          <img src="https://en.gravatar.com/userimage/71535578/a4803efe6592196d7bcda63224972984.jpg" />
        </ion-avatar>
      </ion-col>
    </ion-row>
  </div>

  <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
    <ion-refresher-content refreshingSpinner="crescent"></ion-refresher-content>
  </ion-refresher>



*/
