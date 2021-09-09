import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef} from '@angular/core';
import {Plugins} from '@capacitor/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import {LoadingController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl, SafeValue} from '@angular/platform-browser';
import {environment, httpOptions} from '../../../../environments/environment';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Upload} from 'tus-js-client';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})



export class FormPage {
  public tus = false;
  public error: string | null = null;
  photo: SafeResourceUrl | null = null;
  blobtext: SafeValue;
  conblob: string;
  private counter = 0;
  private loading: HTMLIonLoadingElement | null = null;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  form: FormGroup;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  submitted = false;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  albums = [];

  constructor(private fb: FormBuilder, plt: Platform,private readonly http: HttpClient,
              private readonly sanitizer: DomSanitizer,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController) {
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
    console.log('log');
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
  get dfaculty() {
    return this.form.get('dfaculty');
  }
  get course() {
    return this.form.get('course');
  }
  get national() {
    return this.form.get('national');
  }
  get gender() {
    return this.form.get('gender');
  }




}

