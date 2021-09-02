import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef} from '@angular/core';

import { Platform, ActionSheetController } from '@ionic/angular';



@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})

export class FormPage {
  form: FormGroup;
  submitted = false;
  albums = [];
  constructor(private fb: FormBuilder, plt: Platform) {
    this.form = this.fb.group({
      lastname: [null, [Validators.required, Validators.minLength(5)]],
      name: [null, [Validators.required, Validators.minLength(5)]],
      secondname: [null, [Validators.required, Validators.minLength(5)]],
      iin: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern(/^[0-9]\d*$/)]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      dob: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
    });
  }



  saveDetails() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

}

